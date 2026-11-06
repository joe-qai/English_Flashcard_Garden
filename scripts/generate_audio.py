# -*- coding: utf-8 -*-
"""
英文闪卡园 · 歌谣音频生成脚本

用纯 numpy 合成「八音盒 + 柔和钢琴」音色的器乐伴奏，输出 44.1kHz 立体声，
再交给 ffmpeg 编码为 mp3。旋律均为公有领域儿歌。

用法：
    python scripts/generate_audio.py
产物：
    assets/audio/*.mp3
"""
from __future__ import annotations

import os
import shutil
import subprocess
import wave

import numpy as np

SR = 44100
OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "audio")
WAV_DIR = os.path.join(OUT_DIR, "_wav")

# ---------------------------------------------------------------- 音符工具
NAME_TO_PC = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}


def midi(name: str) -> int:
    """'C4' / 'F#5' / 'Bb3' -> MIDI number"""
    pc = NAME_TO_PC[name[0]]
    i = 1
    if len(name) > 2 and name[1] in "#b":
        pc += 1 if name[1] == "#" else -1
        i = 2
    octave = int(name[i:])
    return pc + (octave + 1) * 12


def hz(m: int) -> float:
    return 440.0 * 2 ** ((m - 69) / 12)


CHORDS = {
    "C": ["C3", "E3", "G3"],
    "F": ["F3", "A3", "C4"],
    "G": ["G3", "B3", "D4"],
    "Am": ["A3", "C4", "E4"],
    "Dm": ["D3", "F3", "A3"],
    "Em": ["E3", "G3", "B3"],
}

# ---------------------------------------------------------------- 曲目数据
# bars: [(旋律[(音名, 拍数)...], 和弦名), ...]，每小节 4 拍
SONGS = {
    "twinkle": {
        "tempo": 104,
        "bars": [
            ([("C4", 1), ("C4", 1), ("G4", 1), ("G4", 1)], "C"),
            ([("A4", 1), ("A4", 1), ("G4", 2)], "C"),
            ([("F4", 1), ("F4", 1), ("E4", 1), ("E4", 1)], "F"),
            ([("D4", 1), ("D4", 1), ("C4", 2)], "C"),
            ([("G4", 1), ("G4", 1), ("F4", 1), ("F4", 1)], "C"),
            ([("E4", 1), ("E4", 1), ("D4", 2)], "G"),
            ([("G4", 1), ("G4", 1), ("F4", 1), ("F4", 1)], "C"),
            ([("E4", 1), ("E4", 1), ("D4", 2)], "G"),
            ([("C4", 1), ("C4", 1), ("G4", 1), ("G4", 1)], "C"),
            ([("A4", 1), ("A4", 1), ("G4", 2)], "C"),
            ([("F4", 1), ("F4", 1), ("E4", 1), ("E4", 1)], "F"),
            ([("D4", 1), ("D4", 1), ("C4", 2)], "C"),
        ],
    },
    "row": {
        "tempo": 152,
        "bars": [
            ([("C5", 1), ("C5", 1), ("C5", 1.5), ("D5", 0.5), ("E5", 1)], "C"),
            ([("E5", 1), ("D5", 1), ("E5", 1.5), ("F5", 0.5), ("G5", 1)], "C"),
            ([("C6", 1), ("C6", 1), ("C6", 1), ("G5", 1)], "C"),
            ([("G5", 1), ("G5", 1), ("E5", 1), ("E5", 1)], "C"),
            ([("C5", 1), ("C5", 1), ("C5", 1), ("G5", 1)], "C"),
            ([("G5", 1), ("F5", 1), ("E5", 1), ("D5", 1)], "G"),
            ([("C5", 4)], "C"),
        ],
    },
    "lamb": {
        "tempo": 108,
        "bars": [
            ([("E4", 1), ("D4", 1), ("C4", 1), ("D4", 1)], "C"),
            ([("E4", 1), ("E4", 1), ("E4", 1), ("E4", 1)], "C"),
            ([("D4", 1), ("D4", 1), ("D4", 2)], "G"),
            ([("E4", 1), ("G4", 1), ("G4", 2)], "C"),
            ([("E4", 1), ("D4", 1), ("C4", 1), ("D4", 1)], "C"),
            ([("E4", 1), ("E4", 1), ("E4", 1), ("E4", 1)], "C"),
            ([("D4", 1), ("D4", 1), ("E4", 1), ("D4", 1)], "G"),
            ([("C4", 4)], "C"),
        ],
    },
    "london": {
        "tempo": 116,
        "bars": [
            ([("G4", 1), ("A4", 0.5), ("G4", 0.5), ("F4", 1), ("E4", 1)], "C"),
            ([("F4", 1), ("G4", 1), ("A4", 1), ("G4", 0.5), ("F4", 0.5)], "C"),
            ([("E4", 1), ("F4", 1), ("G4", 2)], "C"),
            ([("G4", 1), ("A4", 0.5), ("G4", 0.5), ("F4", 1), ("E4", 1)], "F"),
            ([("F4", 1), ("G4", 1), ("A4", 1), ("G4", 0.5), ("F4", 0.5)], "C"),
            ([("E4", 1), ("F4", 1), ("G4", 2)], "G"),
            ([("G4", 1), ("A4", 0.5), ("G4", 0.5), ("F4", 1), ("E4", 1)], "C"),
            ([("D4", 1), ("G4", 1), ("E4", 1), ("C4", 1)], "C"),
        ],
    },
    "bus": {
        "tempo": 120,
        "bars": [
            ([("C4", 1), ("C4", 1), ("C4", 1), ("C4", 1)], "C"),
            ([("C4", 1), ("C4", 1), ("C4", 1), ("C4", 1)], "C"),
            ([("D4", 1), ("D4", 1), ("E4", 1), ("E4", 1)], "C"),
            ([("D4", 1), ("D4", 1), ("C4", 2)], "G"),
            ([("C4", 1), ("C4", 1), ("C4", 1), ("C4", 1)], "C"),
            ([("C4", 1), ("C4", 1), ("C4", 1), ("C4", 1)], "C"),
            ([("E4", 1), ("E4", 1), ("D4", 1), ("D4", 1)], "F"),
            ([("C4", 4)], "C"),
        ],
    },
    "farm": {
        "tempo": 112,
        "bars": [
            ([("G4", 1), ("G4", 1), ("G4", 1), ("D4", 1)], "C"),
            ([("E4", 1), ("E4", 1), ("D4", 2)], "C"),
            ([("B4", 1), ("B4", 1), ("A4", 1), ("A4", 1)], "G"),
            ([("G4", 4)], "C"),
            ([("D4", 1), ("G4", 1), ("G4", 1), ("G4", 1)], "C"),
            ([("D4", 1), ("E4", 1), ("E4", 1), ("D4", 1)], "C"),
            ([("B4", 1), ("B4", 1), ("A4", 1), ("A4", 1)], "G"),
            ([("G4", 4)], "C"),
        ],
    },
}


# ---------------------------------------------------------------- 合成
def bell(freq: float, dur: float, amp: float = 1.0, decay: float = 1.0) -> np.ndarray:
    """八音盒/钢琴混合音色：多谐波 + 各自衰减 + 快速起音"""
    n = max(int(dur * SR), 1)
    t = np.arange(n) / SR
    attack = 1.0 - np.exp(-t / 0.0035)
    sig = np.zeros(n)
    for k, weight in enumerate([1.0, 0.52, 0.30, 0.17, 0.10, 0.06], start=1):
        partial_decay = decay * (1.0 + 0.55 * (k - 1))
        sig += (weight / 1.0) * np.exp(-t / partial_decay) * np.sin(2 * np.pi * freq * k * t)
    sig *= attack / 1.9
    # 轻微立体失谐（模拟琴弦/音条）
    return sig * amp


def render(song: dict) -> np.ndarray:
    beat = 60.0 / song["tempo"]
    bars = song["bars"]
    total_beats = len(bars) * 4
    tail = 3.0
    length = int(total_beats * beat * SR) + int(tail * SR)
    left = np.zeros(length)
    right = np.zeros(length)

    def place(start_s: float, sig: np.ndarray, gain: float, pan: float = 0.0) -> None:
        """等功率声像写入左右声道"""
        i = int(start_s * SR)
        if i >= length:
            return
        j = min(i + len(sig), length)
        seg = sig[: j - i]
        left[i:j] += seg * gain * np.sqrt(0.5 * (1.0 - pan))
        right[i:j] += seg * gain * np.sqrt(0.5 * (1.0 + pan))

    rng = np.random.default_rng(7)

    for bi, (notes, chord) in enumerate(bars):
        bar_start = bi * 4 * beat

        # --- 旋律（居中，略偏右一点点，像琴凳上的听感）
        cursor = bar_start
        for name, beats in notes:
            dur = beats * beat
            sig = bell(hz(midi(name)), dur + 0.9, amp=0.60)
            place(cursor, sig, 1.0, pan=0.04)
            cursor += dur

        # --- 分解和弦伴奏（八分音符，低八度）
        tones = [midi(x) for x in CHORDS[chord]]
        pattern = [0, 2, 1, 2, 0, 2, 1, 2]
        step = beat * 0.5
        for i, p in enumerate(pattern):
            when = bar_start + i * step
            if when >= bar_start + 4 * beat - 1e-6:
                break
            m = tones[p % len(tones)] - 12
            sig = bell(hz(m), 0.85, amp=0.19)
            place(when, sig, 0.9, pan=(-0.34 if i % 2 == 0 else 0.34))

        # --- 根音（每小节一次，柔和）
        root = bell(hz(tones[0] - 24), 1.8, amp=0.17)
        place(bar_start, root, 1.0, pan=0.0)

    # 极缓的颤音，避免过于机械
    t = np.arange(length) / SR
    vibrato = 1.0 + 0.004 * np.sin(2 * np.pi * 0.23 * t)
    left *= vibrato
    right *= vibrato

    # --- 简易混响（合成脉冲响应 + FFT 卷积）
    ir_len = int(1.5 * SR)
    tt = np.arange(ir_len) / SR
    ir = rng.standard_normal(ir_len) * np.exp(-tt / 0.42)
    ir[: int(0.01 * SR)] *= np.linspace(0, 1, int(0.01 * SR))
    ir /= np.max(np.abs(ir)) or 1
    ir *= 0.16
    from scipy.signal import fftconvolve

    left = fftconvolve(left, ir, mode="full")[:length]
    right = fftconvolve(right, ir * 0.96, mode="full")[:length]

    stereo = np.stack([left, right], axis=1)

    # --- 归一化 + 首尾淡入淡出
    peak = float(np.max(np.abs(stereo))) or 1.0
    stereo = stereo / peak * 0.90
    fade_in = int(0.03 * SR)
    fade_out = int(1.2 * SR)
    stereo[:fade_in] *= np.linspace(0, 1, fade_in)[:, None]
    stereo[-fade_out:] *= np.linspace(0, 1, fade_out)[::-1][:, None]
    return stereo


def write_wav(path: str, stereo: np.ndarray) -> None:
    pcm = np.clip(stereo, -1.0, 1.0)
    pcm = (pcm * 32767).astype("<i2")
    with wave.open(path, "wb") as f:
        f.setnchannels(2)
        f.setsampwidth(2)
        f.setframerate(SR)
        f.writeframes(pcm.tobytes())


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    os.makedirs(WAV_DIR, exist_ok=True)
    ffmpeg = shutil.which("ffmpeg") or r"D:\ffmpeg-7.0.2-full_build\bin\ffmpeg.exe"
    for song_id, song in SONGS.items():
        print(f"[synth] {song_id} ...", flush=True)
        stereo = render(song)
        wav_path = os.path.join(WAV_DIR, song_id + ".wav")
        write_wav(wav_path, stereo)
        mp3_path = os.path.join(OUT_DIR, song_id + ".mp3")
        subprocess.run(
            [ffmpeg, "-y", "-loglevel", "error", "-i", wav_path,
             "-codec:a", "libmp3lame", "-b:a", "128k", "-ar", "44100", mp3_path],
            check=True,
        )
        size = os.path.getsize(mp3_path) / 1024 / 1024
        print(f"  -> {mp3_path} ({size:.2f} MB, {len(stereo)/SR:.1f}s)", flush=True)
    shutil.rmtree(WAV_DIR, ignore_errors=True)
    print("done.")


if __name__ == "__main__":
    main()