# -*- coding: utf-8 -*-
"""第三轮图标修正：把「图片和单词对不上」的词换成真正的图。

原则：图上画的必须就是那个东西本身，不能用「长得像」或「沾点边」的凑数。
- 身体部位统一画成同一个简化人体，把目标部位用橙色高亮；
- 其余每个词单独画它的实物。

Run: python scripts/make_icons_fix.py
"""
import math
import os

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'assets', 'icons')

INK = '#2A2A2E'
CREAM = '#F5EFE5'
WOOD = '#DCA96F'
WOOD_D = '#C08B52'
ORANGE = '#F6A94D'
GREEN = '#8FBF6E'
GREEN_D = '#6C9A4E'
CORAL = '#EF7E6B'
BLUE = '#6BB3F0'
STEEL = '#C3CCD3'
STEEL_D = '#93A0A9'
GREY = '#B7BFC6'
WHITE = '#FDFBF7'
SKIN = '#F2C7A0'
SKIN_D = '#E0AE85'
CLOTH = '#DEE6EC'
CLOTH_D = '#BCC8D3'
HL = '#F6A94D'
HL_D = '#CE842C'

E = {}

# ---------------------------------------------------------------- 身体部位
# 同一个正面小人，目标部位用橙色高亮，其余部分是浅色，一眼能看出标的是哪块。
def body(highlight):
    def fill(key, default):
        return HL if key in highlight else default

    def edge(key):
        return HL_D if key in highlight else 'none'

    parts = []

    # 腿
    parts.append(
        '<rect x="25.6" y="52" width="5.6" height="12" rx="2.8" fill="%s"/>'
        % fill('leg', CLOTH))
    parts.append(
        '<rect x="32.8" y="52" width="5.6" height="12" rx="2.8" fill="%s"/>'
        % fill('leg', CLOTH))
    # 膝盖
    parts.append('<circle cx="28.4" cy="58" r="3.2" fill="%s"/>' % fill('knee', fill('leg', CLOTH)))
    parts.append('<circle cx="35.6" cy="58" r="3.2" fill="%s"/>' % fill('knee', fill('leg', CLOTH)))
    # 躯干
    parts.append(
        '<path d="M20 26h24v30a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4z" fill="%s"/>'
        % fill('torso', CLOTH))
    # 胸
    if 'chest' in highlight:
        parts.append(
            '<path d="M20 26h24v11H20z" fill="%s"/>' % HL)
    # 肚子
    if 'stomach' in highlight:
        parts.append('<ellipse cx="32" cy="44.5" rx="9.4" ry="6.2" fill="%s"/>' % HL)
    # 腰
    if 'waist' in highlight:
        parts.append('<rect x="21.5" y="38.4" width="21" height="3.6" fill="%s"/>' % HL)
    # 手臂
    parts.append(
        '<path d="M15 28.5c0-1.6 1.3-2.9 2.9-2.9h3.4c1.6 0 2.9 1.3 2.9 2.9v14.2c0 1.6-1.3 2.9-2.9 2.9h-3.4a2.9 2.9 0 0 1-2.9-2.9z" fill="%s"/>'
        % fill('arm', CLOTH))
    parts.append(
        '<path d="M39.8 28.5c0-1.6 1.3-2.9 2.9-2.9h3.4c1.6 0 2.9 1.3 2.9 2.9v14.2c0 1.6-1.3 2.9-2.9 2.9h-3.4a2.9 2.9 0 0 1-2.9-2.9z" fill="%s"/>'
        % fill('arm', CLOTH))
    # 肘
    if 'elbow' in highlight:
        parts.append('<circle cx="20.8" cy="38.6" r="3.4" fill="%s"/>' % HL)
        parts.append('<circle cx="43.2" cy="38.6" r="3.4" fill="%s"/>' % HL)
    # 手腕
    if 'wrist' in highlight:
        parts.append('<rect x="15.6" y="44" width="10.2" height="3.6" rx="1.8" fill="%s"/>' % HL)
        parts.append('<rect x="38.2" y="44" width="10.2" height="3.6" rx="1.8" fill="%s"/>' % HL)
    # 脖子
    parts.append('<rect x="28.6" y="20.6" width="6.8" height="6" fill="%s"/>' % fill('neck', SKIN))
    # 肩
    if 'shoulder' in highlight:
        parts.append(
            '<path d="M15 28.8c0-3 2.4-5.4 5.4-5.4h2v5.4z" fill="%s"/>' % HL)
        parts.append(
            '<path d="M49 28.8c0-3-2.4-5.4-5.4-5.4h-2v5.4z" fill="%s"/>' % HL)
    # 头
    parts.append('<circle cx="32" cy="13.4" r="8.6" fill="%s"/>' % fill('head', SKIN))
    # 头发
    parts.append(
        '<path d="M23.4 13.4a8.6 8.6 0 0 1 17.2 0c0 2.4-.8 3.8-1.8 5-.5-3.6-2.6-6.2-6.8-6.2s-6.3 2.6-6.8 6.2c-1-1.2-1.8-2.6-1.8-5z" fill="%s"/>'
        % fill('hair', '#5A4632'))
    # 额头
    if 'forehead' in highlight:
        parts.append('<path d="M23.6 13.4a8.4 8.4 0 0 1 16.8 0v1.8H23.6z" fill="%s"/>' % HL)
    # 眉毛
    if 'eyebrow' in highlight:
        parts.append('<circle cx="28.4" cy="18.6" r="1.2" fill="%s"/>' % INK)
        parts.append('<circle cx="35.6" cy="18.6" r="1.2" fill="%s"/>' % INK)
        parts.append('<path d="M25.2 15.6c1.9-2.1 4.5-2.1 6.4 0" fill="none" stroke="%s" stroke-width="2.4" stroke-linecap="round"/>' % HL)
        parts.append('<path d="M32.4 15.6c1.9-2.1 4.5-2.1 6.4 0" fill="none" stroke="%s" stroke-width="2.4" stroke-linecap="round"/>' % HL)
    elif 'head' not in highlight:
        parts.append('<circle cx="28.4" cy="16.6" r="1.1" fill="%s" opacity=".7"/>' % INK)
        parts.append('<circle cx="35.6" cy="16.6" r="1.1" fill="%s" opacity=".7"/>' % INK)
    # 轮廓
    parts.append(
        '<path d="M20 26h24v30a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4z" fill="none" stroke="%s" stroke-opacity=".18" stroke-width="1.6"/>'
        % INK)
    return '\n'.join(parts)


E['head'] = body({'head'})
E['hair'] = body({'hair'})
E['forehead'] = body({'forehead'})
E['eyebrow'] = body({'eyebrow'})
E['neck'] = body({'neck'})
E['shoulder'] = body({'shoulder'})
E['arm'] = body({'arm'})
E['elbow'] = body({'elbow'})
E['wrist'] = body({'wrist'})
E['chest'] = body({'chest'})
E['stomach'] = body({'stomach'})
E['waist'] = body({'waist'})
E['knee'] = body({'knee'})

# ---------------------------------------------------------------- 植物
_fern = ['<path d="M32 58c0-12-1-24 0-37" stroke="%s" stroke-width="3" fill="none" stroke-linecap="round"/>' % GREEN_D]
for i, y in enumerate([48, 41, 34, 27]):
    w = 9 - i * 0.8
    _fern.append('<ellipse cx="%.1f" cy="%d" rx="%.1f" ry="2.6" fill="%s" transform="rotate(-30 %.1f %d)"/>'
                 % (32 - w, y, w, GREEN, 32 - w, y))
    _fern.append('<ellipse cx="%.1f" cy="%d" rx="%.1f" ry="2.6" fill="%s" transform="rotate(30 %.1f %d)"/>'
                 % (32 + w, y - 3, w, GREEN_D, 32 + w, y - 3))
_fern.append('<path d="M32 21c-3-3-4-6-4-9 3 1 5 4 5 7z" fill="%s"/>' % GREEN)
E['fern'] = '\n'.join(_fern)

E['moss'] = f'''
<ellipse cx="32" cy="43" rx="21" ry="13" fill="#C9C2B2"/>
<path d="M11 43c3-8 10-13 18-13 9 0 16 4 20 11" fill="none" stroke="#B3AB99" stroke-width="3" stroke-linecap="round"/>
<g fill="{GREEN}">
<circle cx="21" cy="37" r="6"/><circle cx="30" cy="33" r="7"/><circle cx="40" cy="35" r="6"/>
<circle cx="47" cy="41" r="5"/><circle cx="25" cy="46" r="5"/><circle cx="36" cy="46" r="5"/>
</g>
<g fill="{GREEN_D}"><circle cx="25" cy="34" r="3"/><circle cx="36" cy="39" r="3"/><circle cx="43" cy="37" r="2.6"/></g>
<g fill="{GREEN}" opacity=".85"><circle cx="15" cy="44" r="3"/><circle cx="45" cy="47" r="3"/></g>
'''

E['orchid'] = f'''
<path d="M32 58c0-7 0-11 0-16" stroke="{GREEN_D}" stroke-width="3" stroke-linecap="round"/>
<path d="M32 52c-5 0-9-2-11-5 5-2 9 0 11 5z" fill="{GREEN}"/>
<path d="M32 48c5-1 8-4 9-7-5-1-8 1-9 7z" fill="{GREEN_D}"/>
<g fill="#C09BD8">
<ellipse cx="32" cy="17" rx="6" ry="9.5"/>
<ellipse cx="19" cy="27" rx="6" ry="9.5" transform="rotate(-58 19 27)"/>
<ellipse cx="45" cy="27" rx="6" ry="9.5" transform="rotate(58 45 27)"/>
<ellipse cx="23" cy="42" rx="5.2" ry="8" transform="rotate(-28 23 42)"/>
<ellipse cx="41" cy="42" rx="5.2" ry="8" transform="rotate(28 41 42)"/>
</g>
<path d="M32 29c4 0 7 3.2 7 7.4S36 44 32 44s-7-3.4-7-7.6 3-7.4 7-7.4z" fill="#F6C86B"/>
<path d="M32 35c2 0 3 1.6 3 3.6s-1 3.4-3 3.4" fill="none" stroke="#DFA63A" stroke-width="2"/>
'''

_wheat = ['<path d="M32 58V17" stroke="#C9A227" stroke-width="3" stroke-linecap="round"/>']
for y in range(20, 43, 6):
    _wheat.append('<ellipse cx="27.6" cy="%d" rx="4.6" ry="3" fill="#E4B94E" transform="rotate(-32 27.6 %d)"/>' % (y, y))
    _wheat.append('<ellipse cx="36.4" cy="%d" rx="4.6" ry="3" fill="#D9A93A" transform="rotate(32 36.4 %d)"/>' % (y + 3, y + 3))
_wheat.append('<ellipse cx="32" cy="14.5" rx="3.4" ry="5.4" fill="#E4B94E"/>')
_wheat.append('<g stroke="#D9A93A" stroke-width="1.6" stroke-linecap="round"><path d="M32 10V5M29 12l-3-4M35 12l3-4"/></g>')
E['wheat'] = '\n'.join(_wheat)

E['soil'] = f'''
<path d="M3 54h58" stroke="#B99B72" stroke-width="2.4" stroke-linecap="round"/>
<path d="M6 54c1-12 12-20 26-20s25 8 26 20z" fill="#6E482E"/>
<path d="M6 54c1-12 12-20 26-20s25 8 26 20z" fill="none" stroke="#5A3A24" stroke-width="1.6"/>
<g stroke="#4E3220" stroke-width="1.8" fill="none" stroke-linecap="round">
<path d="M32 44v8M32 48l-6 4M32 48l6 4M32 51l-4 3M32 51l4 3"/>
</g>
<g fill="#A9784F"><circle cx="17" cy="49" r="2"/><circle cx="46" cy="50" r="1.8"/><circle cx="26" cy="52" r="1.4"/></g>
<path d="M32 34v-6" stroke="{GREEN_D}" stroke-width="2.6" stroke-linecap="round"/>
<path d="M32 29c-4-1-7-4-7-8 4 0 7 3 7 8z" fill="{GREEN}"/>
<path d="M32 32c4-1 6-4 6-7-4 0-6 3-6 7z" fill="{GREEN_D}"/>
'''

# ---------------------------------------------------------------- 军事
E['spear'] = f'''
<path d="M13 55L38 27" stroke="{WOOD}" stroke-width="4" stroke-linecap="round"/>
<path d="M41 19c3-5 8-9 14-11-1 7-5 12-11 15z" fill="{STEEL}" stroke="{STEEL_D}" stroke-width="1.4"/>
<path d="M44 23l3 3" stroke="{STEEL_D}" stroke-width="2" stroke-linecap="round"/>
<g stroke="{CORAL}" stroke-width="2.6" stroke-linecap="round">
<path d="M33 30l4 4M29 34l4 4"/>
</g>
'''

E['arrow'] = f'''
<path d="M13 53L47 19" stroke="{WOOD}" stroke-width="3.4" stroke-linecap="round"/>
<path d="M51 11l-9 3 6 6z" fill="{STEEL}" stroke="{STEEL_D}" stroke-width="1.4"/>
<path d="M11 55l3-11 5 3-4 6 4 4z" fill="{CORAL}"/>
<path d="M9 47l5 3" stroke="{CORAL}" stroke-width="2" stroke-linecap="round"/>
'''

E['warship'] = f'''
<path d="M5 42h54l-7 10H12z" fill="{STEEL_D}"/>
<rect x="18" y="26" width="22" height="16" rx="2" fill="{STEEL}"/>
<rect x="26" y="15" width="3.4" height="12" fill="{STEEL_D}"/>
<path d="M22 18h12" stroke="{STEEL_D}" stroke-width="2.6" stroke-linecap="round"/>
<rect x="8" y="35" width="9" height="7" rx="2" fill="{STEEL}"/>
<path d="M8 37H3" stroke="{STEEL_D}" stroke-width="2.6" stroke-linecap="round"/>
<rect x="44" y="30" width="4" height="12" fill="{STEEL}"/>
<path d="M46 30V20" stroke="{STEEL_D}" stroke-width="2"/>
<g stroke="{BLUE}" stroke-width="2" fill="none" opacity=".75">
<path d="M4 56c4-3 8-3 12 0s8 3 12 0 8-3 12 0 8 3 12 0"/>
</g>
'''

# ---------------------------------------------------------------- 穿着
E['shirt'] = f'''
<path d="M23 12l9 5 9-5 8 6-4 10-4-2v25H23V26l-4 2-4-10z" fill="#8FB8DA"/>
<path d="M23 12l9 5-9 7z" fill="#7AA6CB"/>
<path d="M41 12l-9 5 9 7z" fill="#7AA6CB"/>
<path d="M32 17v34" stroke="#7AA6CB" stroke-width="1.6"/>
<g fill="{WHITE}"><circle cx="32" cy="26" r="1.5"/><circle cx="32" cy="34" r="1.5"/><circle cx="32" cy="42" r="1.5"/></g>
<path d="M23 12l9 5 9-5" fill="none" stroke="#6D98BC" stroke-width="1.6"/>
'''

E['shoelace'] = f'''
<ellipse cx="32" cy="32" rx="15" ry="25" fill="#8A5F3F" stroke="#5C3D28" stroke-width="2"/>
<path d="M32 8.6c-5.6 0-8.6 3.6-8.6 8.4v15.4h17.2V17c0-4.8-3-8.4-8.6-8.4z" fill="#6E482E"/>
<path d="M23.4 32.4h17.2V44H23.4z" fill="#7A5236"/>
<g fill="{WHITE}" stroke="{STEEL_D}" stroke-width="1.2">
<circle cx="25.6" cy="18" r="1.8"/><circle cx="38.4" cy="18" r="1.8"/>
<circle cx="25.6" cy="24" r="1.8"/><circle cx="38.4" cy="24" r="1.8"/>
<circle cx="25.6" cy="30" r="1.8"/><circle cx="38.4" cy="30" r="1.8"/>
</g>
<g stroke="{ORANGE}" stroke-width="2.4" stroke-linecap="round" fill="none">
<path d="M25.6 18l12.8 6M38.4 18l-12.8 6M25.6 24l12.8 6M38.4 24l-12.8 6"/>
</g>
<path d="M23 50.6h18" stroke="#5C3D28" stroke-width="2.2" stroke-linecap="round"/>
'''

# ---------------------------------------------------------------- 文具
def protractor():
    parts = ['<path d="M6 44a26 26 0 0 1 52 0z" fill="#CFE3F2" stroke="%s" stroke-width="2"/>' % STEEL_D]
    parts.append('<path d="M20 44a12 12 0 0 1 24 0z" fill="%s"/>' % WHITE)
    parts.append('<path d="M6 44h52" stroke="%s" stroke-width="2.4" stroke-linecap="round"/>' % STEEL_D)
    for deg in range(0, 181, 15):
        rad = math.radians(deg)
        x1, y1 = 32 + 25 * math.cos(rad), 44 - 25 * math.sin(rad)
        r2 = 20 if deg % 45 else 17
        x2, y2 = 32 + r2 * math.cos(rad), 44 - r2 * math.sin(rad)
        parts.append('<path d="M%.1f %.1fL%.1f %.1f" stroke="%s" stroke-width="1.3"/>' % (x1, y1, x2, y2, STEEL_D))
    parts.append('<circle cx="32" cy="44" r="2.2" fill="%s"/>' % STEEL_D)
    return '\n'.join(parts)


E['protractor'] = protractor()

# ---------------------------------------------------------------- 节气 / 季节
E['autumn-equinox'] = f'''
<path d="M3 41h58" stroke="{WOOD_D}" stroke-width="2.6" stroke-linecap="round"/>
<path d="M13 41a19 19 0 0 1 38 0z" fill="{ORANGE}"/>
<g stroke="{ORANGE}" stroke-width="2.2" stroke-linecap="round">
<path d="M32 15V9M20 19l-4-5M44 19l4-5M10 30l-6-2M54 30l6-2"/>
</g>
<path d="M47 12c5 6 9 9 13 9-4 3-9 2-13-1-2-3-2-5 0-8z" fill="{CORAL}"/>
<path d="M52 24c2 4 5 6 8 6-3 2-6 1-8-1-1-2-1-3 0-5z" fill="#E9A24D"/>
<g stroke="{GREEN_D}" stroke-width="2.2" fill="none" stroke-linecap="round">
<path d="M4 50c6-3 12-3 18 0s12 3 18 0 12-3 18 0"/>
</g>
'''

E['winter-solstice'] = f'''
<path d="M3 45h58" stroke="#9FB6C6" stroke-width="2.6" stroke-linecap="round"/>
<path d="M17 45a15 15 0 0 1 30 0z" fill="#F2C14E"/>
<g stroke="#F2C14E" stroke-width="2" stroke-linecap="round" opacity=".85">
<path d="M12 36l-5-3M52 36l5-3M32 26v-6"/>
</g>
<path d="M3 45c5 3 10 3 15 0s10-3 15 0 10 3 15 0" fill="{WHITE}" stroke="#D6E3EC" stroke-width="2"/>
<path d="M47 51h11M50 47h5" stroke="#D6E3EC" stroke-width="2" stroke-linecap="round"/>
<g fill="{WHITE}"><circle cx="12" cy="22" r="1.8"/><circle cx="20" cy="14" r="1.4"/><circle cx="50" cy="18" r="1.6"/></g>
'''

E['equinox'] = f'''
<circle cx="32" cy="32" r="20" fill="{WHITE}" stroke="{STEEL_D}" stroke-width="2"/>
<path d="M32 12a20 20 0 0 1 0 40z" fill="#3F5875"/>
<circle cx="21" cy="27" r="6" fill="{ORANGE}"/>
<g stroke="{ORANGE}" stroke-width="1.6" stroke-linecap="round" opacity=".8">
<path d="M21 17v-3M12 27h-3M27 38l2 2"/>
</g>
<g fill="{WHITE}"><circle cx="41" cy="22" r="1.6"/><circle cx="47" cy="31" r="1.2"/><circle cx="39" cy="40" r="1.4"/></g>
<path d="M32 8v48" stroke="{STEEL_D}" stroke-width="1.2" stroke-dasharray="3 3"/>
'''

E['spring'] = f'''
<path d="M6 54c11-1 19-7 25-15s15-13 27-14" fill="none" stroke="{WOOD_D}" stroke-width="3" stroke-linecap="round"/>
<path d="M22 44c-5-3-7-7-6-11 4 0 7 3 8 8z" fill="{GREEN}"/>
<path d="M36 32c4-3 6-7 5-11-4 1-6 4-7 8z" fill="{GREEN_D}"/>
<g fill="#F089B0">
<circle cx="16" cy="34" r="4"/><circle cx="24" cy="30" r="4"/><circle cx="20" cy="24" r="4"/><circle cx="11" cy="28" r="4"/><circle cx="15" cy="21" r="4"/>
</g>
<circle cx="16" cy="27" r="2.4" fill="#F6C86B"/>
<g fill="#F6A8C2">
<circle cx="44" cy="20" r="3.4"/><circle cx="50" cy="17" r="3.4"/><circle cx="47" cy="12" r="3.4"/><circle cx="41" cy="15" r="3.4"/><circle cx="44" cy="9" r="3.4"/>
</g>
<circle cx="44" cy="15" r="2" fill="#F6C86B"/>
<g fill="#F089B0"><circle cx="30" cy="40" r="2.6"/><circle cx="56" cy="24" r="2.4"/></g>
'''

E['winter'] = f'''
<path d="M32 54V24" stroke="#8C6A4A" stroke-width="3.4" stroke-linecap="round"/>
<g fill="#5C8D6B">
<path d="M32 12l-13 15h26z"/>
<path d="M32 22l-11 13h22z"/>
<path d="M32 31l-9 11h18z"/>
</g>
<g fill="{WHITE}">
<path d="M32 12l-8 9h16z"/>
<path d="M32 22l-7 8h14z"/>
<path d="M32 31l-5 6h10z"/>
</g>
<path d="M5 56c7-4 14-4 21 0 7 4 14 4 21 0 4-2 8-3 12-2v6H5z" fill="{WHITE}"/>
<g fill="{WHITE}"><circle cx="12" cy="18" r="1.8"/><circle cx="50" cy="12" r="1.6"/><circle cx="56" cy="34" r="1.5"/><circle cx="8" cy="36" r="1.4"/></g>
<g stroke="{WHITE}" stroke-width="1.4" stroke-linecap="round"><path d="M12 14v8M8 18h8M50 8v8M46 12h8"/></g>
'''

E['midsummer'] = f'''
<circle cx="32" cy="17" r="10" fill="{ORANGE}"/>
<g stroke="{ORANGE}" stroke-width="2.2" stroke-linecap="round">
<path d="M32 2v-4M17 17h-4M47 17h4M21 7l-3-3M43 7l3-3"/>
</g>
<path d="M3 45c8-4 16-4 24 0 8 4 16 4 24 0v13H3z" fill="{GREEN}"/>
<path d="M3 51c8-3 16-3 24 0 8 3 16 3 24 0v7H3z" fill="{GREEN_D}"/>
<g fill="#F089B0"><circle cx="16" cy="44" r="3"/><circle cx="48" cy="45" r="2.6"/></g>
<g fill="#F6C86B"><circle cx="16" cy="44" r="1.2"/><circle cx="48" cy="45" r="1.1"/></g>
<path d="M40 36c3-3 6-3 8 0-2 3-5 3-8 0z" fill="{BLUE}"/>
<path d="M30 39c2-3 5-4 7-2" stroke="{GREEN_D}" stroke-width="2" fill="none" stroke-linecap="round"/>
'''

E['fertilise'] = f'''
<path d="M4 52h56v8H4z" fill="#6E482E"/>
<path d="M4 52h56v2.6H4z" fill="#8B5E3C"/>
<g transform="rotate(-18 30 30)">
<path d="M17 14h22l5 12v18c0 3-2 5-5 5H20c-3 0-5-2-5-5V26z" fill="#C97B3C" stroke="#A9602B" stroke-width="1.8"/>
<path d="M17 22h27" stroke="#A9602B" stroke-width="1.6"/>
<path d="M22 14l4 8M34 14l-2 8" stroke="#A9602B" stroke-width="1.6" stroke-linecap="round"/>
<rect x="20" y="30" width="20" height="10" rx="1.5" fill="{WHITE}" opacity=".9"/>
<path d="M24 33.5h12M24 36.5h9" stroke="#C9A227" stroke-width="1.4" stroke-linecap="round"/>
</g>
<g fill="#E4B94E">
<circle cx="47" cy="32" r="2"/><circle cx="51" cy="38" r="1.8"/><circle cx="45" cy="41" r="1.7"/>
<circle cx="49" cy="46" r="1.9"/><circle cx="41" cy="47" r="1.6"/>
</g>
<path d="M57 50c0-5-2-8-5-9 0 5 2 8 5 9z" fill="{GREEN_D}"/>
<path d="M57 50c3-3 4-6 3-9-3 2-4 5-3 9z" fill="{GREEN}"/>
'''

E['frost-descent'] = f'''
<path d="M32 10v40M14 20l36 20M50 20L14 40" stroke="#8FC7E8" stroke-width="3" stroke-linecap="round"/>
<g stroke="#B7DCF2" stroke-width="2" stroke-linecap="round">
<path d="M32 18l-5-4M32 18l5-4M32 42l-5 4M32 42l5 4"/>
<path d="M22 26l-2-6M22 26l-6 2M42 34l2 6M42 34l6-2"/>
<path d="M42 26l2-6M42 26l6 2M22 34l-2 6M22 34l-6 2"/>
</g>
<path d="M6 52c6-3 12-3 18 0s12 3 18 0 8-2 12 0" stroke="{GREEN_D}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
'''

E['beginning-of-winter'] = f'''
<path d="M32 54V26" stroke="#8C6A4A" stroke-width="3.4" stroke-linecap="round"/>
<path d="M32 34L20 24M32 40l12-10M32 30l-8-12" stroke="#8C6A4A" stroke-width="2.6" stroke-linecap="round" fill="none"/>
<g stroke="#C9D8E3" stroke-width="2.2" stroke-linecap="round"><path d="M12 28l-3-6M44 22l4-6"/></g>
<path d="M4 54c6-4 12-4 18 0 6 4 12 4 18 0 6-4 12-4 20 0v6H4z" fill="{WHITE}"/>
<g fill="{WHITE}"><circle cx="16" cy="18" r="1.6"/><circle cx="48" cy="14" r="1.4"/><circle cx="38" cy="8" r="1.2"/></g>
'''

E['end-of-heat'] = f'''
<path d="M3 46h58" stroke="{WOOD_D}" stroke-width="2.6" stroke-linecap="round"/>
<path d="M16 46a16 16 0 0 1 32 0z" fill="#F2A03C"/>
<g stroke="#F2A03C" stroke-width="2" stroke-linecap="round" opacity=".8">
<path d="M32 24v-6M14 40l-5-3M50 40l5-3"/>
</g>
<g stroke="#EF7E6B" stroke-width="2" fill="none" stroke-linecap="round" opacity=".9">
<path d="M22 52c-2-3 2-5 0-8M32 54c-2-3 2-5 0-8M42 52c-2-3 2-5 0-8"/>
</g>
'''

# ---------------------------------------------------------------- 房间
E['attic'] = f'''
<path d="M5 36L32 10l27 26z" fill="#C08B52"/>
<path d="M5 36h54v4H5z" fill="#A9784F"/>
<path d="M12 34L32 16l20 18z" fill="#F5EFE5"/>
<rect x="14" y="40" width="36" height="18" fill="#E6D9C4"/>
<rect x="17" y="26" width="10" height="8" fill="{WOOD}" stroke="{WOOD_D}" stroke-width="1.6"/>
<rect x="30" y="28" width="8" height="6" fill="#D9B08C" stroke="{WOOD_D}" stroke-width="1.6"/>
<path d="M38 34l6-10M44 34l6-10M40 30h8M39 34h8" stroke="{WOOD_D}" stroke-width="2" stroke-linecap="round" fill="none"/>
<path d="M8 58h48" stroke="{STEEL_D}" stroke-width="2.6" stroke-linecap="round"/>
'''

E['wall'] = f'''
<rect x="4" y="10" width="56" height="44" rx="3" fill="#D9B08C"/>
<g stroke="#B98C63" stroke-width="2">
<path d="M4 22h56M4 34h56M4 46h56"/>
<path d="M18 10v12M34 10v12M50 10v12"/>
<path d="M10 22v12M26 22v12M42 22v12M58 22v12"/>
<path d="M18 34v12M34 34v12M50 34v12"/>
<path d="M10 46v8M26 46v8M42 46v8M58 46v8"/>
</g>
<rect x="4" y="10" width="56" height="44" rx="3" fill="none" stroke="#A9784F" stroke-width="2.4"/>
'''

E['roof'] = f'''
<path d="M4 40L32 12l28 28z" fill="#C4694F"/>
<path d="M4 40L32 12l28 28z" fill="none" stroke="#A8543E" stroke-width="2"/>
<g stroke="#A8543E" stroke-width="1.8" opacity=".8">
<path d="M13 31l38 0M20 24l24 0M27 17l10 0"/>
<path d="M10 34l6 6M22 22l6 6M34 22l6 6M46 34l6 6"/>
</g>
<rect x="42" y="14" width="7" height="10" fill="#A8543E"/>
<path d="M4 40h56v4H4z" fill="#F5EFE5" stroke="#D9C7AE" stroke-width="2"/>
'''

E['porch'] = f'''
<rect x="12" y="18" width="40" height="28" fill="#F2E7D6"/>
<path d="M8 18h48l-4 9H12z" fill="{CORAL}"/>
<path d="M12 27h40" stroke="#D9A796" stroke-width="2"/>
<rect x="12" y="27" width="4.6" height="29" fill="{WOOD}"/>
<rect x="47.4" y="27" width="4.6" height="29" fill="{WOOD}"/>
<rect x="25" y="31" width="14" height="25" rx="1.5" fill="{WOOD_D}"/>
<circle cx="36" cy="44" r="1.6" fill="{WHITE}"/>
<path d="M20 56h24v4H18z" fill="#D9B08C"/>
<path d="M16 52h32v3H16z" fill="#C9A07C"/>
'''

E['heat-haze-gap'] = ''

# ---------------------------------------------------------------- 工具
E['duct-tape'] = f'''
<circle cx="21" cy="40" r="14" fill="{GREY}" stroke="{STEEL_D}" stroke-width="2"/>
<circle cx="21" cy="40" r="11" fill="{STEEL}"/>
<circle cx="21" cy="40" r="4.4" fill="#E9DCC3" stroke="#CDBB9C" stroke-width="1.4"/>
<g stroke="{STEEL_D}" stroke-width="1" opacity=".55">
<path d="M21 29v22M10 40h22M13 32l16 16M29 32l-16 16"/>
</g>
<path d="M31 33h23l2 3-2 3 2 3-2 3H31z" fill="{STEEL}" stroke="{STEEL_D}" stroke-width="1.8" stroke-linejoin="round"/>
<path d="M34 35h18M34 45h18" stroke="{STEEL_D}" stroke-width="1" opacity=".5"/>
'''

E['outlet'] = f'''
<rect x="14" y="9" width="36" height="46" rx="6" fill="{WHITE}" stroke="{STEEL_D}" stroke-width="2.2"/>
<rect x="20" y="15" width="24" height="34" rx="4" fill="#EDF2F6"/>
<rect x="25.6" y="23" width="4.4" height="9" rx="2.2" fill="{INK}"/>
<rect x="34" y="23" width="4.4" height="9" rx="2.2" fill="{INK}"/>
<circle cx="32" cy="40" r="2.4" fill="{INK}"/>
<path d="M24 51h16" stroke="{STEEL_D}" stroke-width="1.6" stroke-linecap="round" opacity=".6"/>
'''

E['broken'] = f'''
<ellipse cx="30" cy="38" rx="24" ry="13" fill="#E6F2FA" stroke="{STEEL_D}" stroke-width="2"/>
<ellipse cx="30" cy="36" rx="15" ry="6.4" fill="{WHITE}" stroke="#D6E3EC" stroke-width="1.4"/>
<path d="M30 24l-4 6 6 3-6 4 5 5" fill="none" stroke="#C4694F" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>
<path d="M46 27l10 4-4 7-6-3 2-4z" fill="#E6F2FA" stroke="{STEEL_D}" stroke-width="1.8" stroke-linejoin="round"/>
<path d="M8 52l-3 5M40 52l3 5M22 54l-1 5" stroke="{STEEL_D}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
'''

E['switch'] = f'''
<rect x="6" y="16" width="52" height="32" rx="5" fill="{WHITE}" stroke="{STEEL_D}" stroke-width="2.2"/>
<rect x="16" y="21" width="26" height="22" rx="3" fill="#EDF2F6" stroke="{STEEL_D}" stroke-width="1.6"/>
<path d="M17 22h24v10H17z" fill="{ORANGE}" stroke="{HL_D}" stroke-width="1.2"/>
<path d="M23 27h12" stroke="{HL_D}" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>
<path d="M48 24v14" stroke="{STEEL_D}" stroke-width="2.4" stroke-linecap="round"/>
<circle cx="48" cy="42" r="1.8" fill="none" stroke="{STEEL_D}" stroke-width="1.6"/>
<circle cx="10" cy="32" r="1.6" fill="{STEEL}" stroke="{STEEL_D}" stroke-width="1"/>
<circle cx="54" cy="32" r="1.6" fill="{STEEL}" stroke="{STEEL_D}" stroke-width="1"/>
'''

E['typhoon'] = f'''
<circle cx="32" cy="32" r="26" fill="#EAF3FB"/>
<path d="M32 8a24 24 0 1 1-17 7" fill="none" stroke="{BLUE}" stroke-width="5" stroke-linecap="round"/>
<path d="M32 17a15 15 0 1 0 10.6 25.6" fill="none" stroke="#4C93D8" stroke-width="4" stroke-linecap="round"/>
<circle cx="32" cy="32" r="5" fill="#2E6EAF"/>
<path d="M32 8a24 24 0 1 1-17 7" fill="none" stroke="#FFFFFF" stroke-width="1.4" stroke-dasharray="2 6" opacity=".8"/>
'''

# ---------------------------------------------------------------- 交通 / 购物 / 兴趣
E['traffic-jam'] = f'''
<g>
<rect x="3" y="30" width="17" height="12" rx="3" fill="{CORAL}"/>
<path d="M6 30l3-5h8l3 5z" fill="#D96A57"/>
<circle cx="7" cy="43" r="2.6" fill="{INK}"/><circle cx="16" cy="43" r="2.6" fill="{INK}"/>
</g>
<g>
<rect x="23" y="30" width="17" height="12" rx="3" fill="{BLUE}"/>
<path d="M26 30l3-5h8l3 5z" fill="#4C93D8"/>
<circle cx="27" cy="43" r="2.6" fill="{INK}"/><circle cx="36" cy="43" r="2.6" fill="{INK}"/>
</g>
<g>
<rect x="43" y="30" width="17" height="12" rx="3" fill="#F2C14E"/>
<path d="M46 30l3-5h8l3 5z" fill="#D9A93A"/>
<circle cx="47" cy="43" r="2.6" fill="{INK}"/><circle cx="56" cy="43" r="2.6" fill="{INK}"/>
</g>
<path d="M3 50h58" stroke="{GREY}" stroke-width="3" stroke-linecap="round"/>
<g stroke="{GREY}" stroke-width="2" stroke-linecap="round" opacity=".8"><path d="M10 52v3M24 52v3M38 52v3M52 52v3"/></g>
<g fill="{GREY}" opacity=".7"><circle cx="51" cy="24" r="2"/><circle cx="56" cy="20" r="1.6"/><circle cx="46" cy="20" r="1.4"/></g>
'''

E['boarding'] = f'''
<path d="M20 20h26c8 0 14 4 14 10s-6 10-14 10H20c-2 0-4-2-4-4V24c0-2 2-4 4-4z" fill="{STEEL}" stroke="{STEEL_D}" stroke-width="1.8"/>
<path d="M22 20l-8-9h9l7 9z" fill="{STEEL_D}"/>
<g fill="#5A87B4">
<circle cx="42" cy="26" r="2.2"/><circle cx="49" cy="26" r="2.2"/><circle cx="56" cy="26" r="2.2"/>
</g>
<rect x="26" y="23" width="7" height="13" rx="1.6" fill="#EDF2F6" stroke="{STEEL_D}" stroke-width="1.4"/>
<path d="M24 36h-4l-4 6h-4l-4 6h-4l-4 6" fill="none" stroke="{STEEL_D}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
<g>
<circle cx="14" cy="40" r="2.8" fill="{SKIN}"/>
<path d="M11.4 44h5.2l1 7h-7z" fill="{ORANGE}"/>
</g>
<path d="M36 30h14" stroke="{ORANGE}" stroke-width="2.6" stroke-linecap="round"/>
<path d="M46 26l6 4-6 4" fill="none" stroke="{ORANGE}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
'''

E['passenger'] = f'''
<circle cx="26" cy="15" r="5.4" fill="{SKIN}"/>
<path d="M20 23c0-2 1.8-3.6 4-3.6h4c2.2 0 4 1.6 4 3.6l1.6 12H18.4z" fill="{BLUE}"/>
<path d="M20 34l-1 12h7l1-9" fill="{BLUE}"/>
<path d="M32 34l2 12h-7l-1-9" fill="{BLUE}"/>
<path d="M33 25l6 5" stroke="{SKIN}" stroke-width="3.6" stroke-linecap="round"/>
<rect x="38" y="38" width="16" height="14" rx="2.6" fill="{WOOD}" stroke="{WOOD_D}" stroke-width="1.8"/>
<path d="M42 38v-4h7v4" fill="none" stroke="{WOOD_D}" stroke-width="2.4" stroke-linecap="round"/>
<path d="M38 44h16" stroke="{WOOD_D}" stroke-width="1.6"/>
<path d="M44 20h12v9H44z" fill="{WHITE}" stroke="{STEEL_D}" stroke-width="1.4"/>
<path d="M47 23h6M47 26h4" stroke="{STEEL_D}" stroke-width="1.4" stroke-linecap="round"/>
'''

E['distance'] = f'''
<g fill="{CORAL}"><path d="M14 12a8 8 0 0 1 8 8c0 6-8 14-8 14S6 26 6 20a8 8 0 0 1 8-8z"/></g>
<circle cx="14" cy="20" r="3" fill="{WHITE}"/>
<g fill="{BLUE}"><path d="M50 12a8 8 0 0 1 8 8c0 6-8 14-8 14s-8-8-8-14a8 8 0 0 1 8-8z"/></g>
<circle cx="50" cy="20" r="3" fill="{WHITE}"/>
<path d="M20 40h24" stroke="{STEEL_D}" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="4 4"/>
<path d="M20 40l5-4v8z" fill="{STEEL_D}"/>
<path d="M44 40l-5-4v8z" fill="{STEEL_D}"/>
<path d="M6 52c8-3 16-3 24 0s16 3 28 0" stroke="{GREY}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
'''

E['model'] = f'''
<path d="M10 24l22-6 14 6-14 6z" fill="{STEEL}"/>
<path d="M32 18l6-6 2 8z" fill="{STEEL_D}"/>
<path d="M18 22l-4-6 12 3" fill="#EDF2F6" stroke="{STEEL_D}" stroke-width="1.4" stroke-linejoin="round"/>
<path d="M46 24l8 2-6 3" fill="{CORAL}"/>
<path d="M32 30v16" stroke="{WOOD_D}" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="32" cy="50" rx="13" ry="5" fill="{WOOD}" stroke="{WOOD_D}" stroke-width="1.8"/>
<path d="M24 50h16" stroke="{WOOD_D}" stroke-width="1.4" opacity=".7"/>
'''

E['parade'] = f'''
<path d="M14 54V12" stroke="{WOOD_D}" stroke-width="3" stroke-linecap="round"/>
<path d="M14 14h20l-4 6 4 6H14z" fill="{CORAL}"/>
<g>
<circle cx="30" cy="32" r="4.4" fill="{SKIN}"/>
<path d="M25 39c0-2 1.6-3.4 3.6-3.4h3c2 0 3.6 1.4 3.6 3.4l1 13H24z" fill="{ORANGE}"/>
<path d="M27 52l-1 6M33 52l1 6" stroke="{ORANGE}" stroke-width="3.4" stroke-linecap="round"/>
<path d="M26 40l-4 5M36 40l4 4" stroke="{SKIN}" stroke-width="3" stroke-linecap="round"/>
</g>
<g>
<circle cx="46" cy="35" r="4" fill="{SKIN}"/>
<path d="M41 41.5c0-1.8 1.5-3.2 3.3-3.2h2.6c1.8 0 3.3 1.4 3.3 3.2l.9 11.6H40z" fill="{BLUE}"/>
<path d="M43 53l-1 6M48 53l1 6" stroke="{BLUE}" stroke-width="3.2" stroke-linecap="round"/>
<path d="M42 42l-3 5" stroke="{SKIN}" stroke-width="2.8" stroke-linecap="round"/>
</g>
<g fill="#F089B0"><circle cx="22" cy="14" r="1.8"/><circle cx="40" cy="10" r="1.6"/><circle cx="52" cy="20" r="1.8"/><circle cx="34" cy="20" r="1.4"/></g>
<g fill="#F6C86B"><circle cx="30" cy="8" r="1.4"/><circle cx="56" cy="10" r="1.4"/><circle cx="46" cy="24" r="1.4"/></g>
'''

E['costume'] = f'''
<path d="M32 12v6" stroke="{STEEL_D}" stroke-width="2.4" stroke-linecap="round"/>
<path d="M32 18l-9 6h18z" fill="none" stroke="{STEEL_D}" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M32 24c9 0 14 4 17 10l-4 22H19L15 34c3-6 8-10 17-10z" fill="#8C6BC0"/>
<path d="M15 34l6 8 3-11z" fill="#7A5AAF"/>
<path d="M49 34l-6 8-3-11z" fill="#7A5AAF"/>
<path d="M32 28c3 0 5 2 5 5v8h-10v-8c0-3 2-5 5-5z" fill="#6B4E9B"/>
<path d="M22 40h7v5h-7zM35 40h7v5h-7z" fill="{WHITE}" stroke="{STEEL_D}" stroke-width="1.2"/>
<path d="M25 42.5h2M38 42.5h2" stroke="{INK}" stroke-width="1.6" stroke-linecap="round"/>
<path d="M19 56h26" stroke="#6B4E9B" stroke-width="3" stroke-linecap="round"/>
'''

# ---------------------------------------------------------------- 时间
E['yesterday'] = f'''
<rect x="10" y="12" width="44" height="40" rx="5" fill="{WHITE}" stroke="{STEEL_D}" stroke-width="2.2"/>
<path d="M10 17a5 5 0 0 1 5-5h34a5 5 0 0 1 5 5v6H10z" fill="{CORAL}"/>
<path d="M20 8v7M44 8v7" stroke="{STEEL_D}" stroke-width="3" stroke-linecap="round"/>
<path d="M38 38H22" stroke="{ORANGE}" stroke-width="3.4" stroke-linecap="round"/>
<path d="M28 31l-7 7 7 7" fill="none" stroke="{ORANGE}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="43" cy="26" r="2" fill="{CORAL}"/>
'''

E['midnight'] = f'''
<circle cx="32" cy="33" r="20" fill="{WHITE}" stroke="{STEEL_D}" stroke-width="3"/>
<g stroke="{INK}" stroke-width="1.6" stroke-linecap="round" opacity=".7">
<path d="M32 16v3M32 47v3M15 33h3M46 33h3"/>
</g>
<path d="M32 33V17" stroke="{INK}" stroke-width="3.2" stroke-linecap="round"/>
<path d="M32 33l11 6" stroke="{INK}" stroke-width="3.2" stroke-linecap="round"/>
<circle cx="32" cy="33" r="2.6" fill="{INK}"/>
<path d="M32 15v3M32 48v3" stroke="{CORAL}" stroke-width="2.6" stroke-linecap="round"/>
<g fill="{ORANGE}"><circle cx="52" cy="10" r="2"/><circle cx="58" cy="18" r="1.5"/><circle cx="45" cy="7" r="1.4"/></g>
'''

# ---------------------------------------------------------------- 健康 / 职业
E['pharmacy'] = f'''
<rect x="8" y="22" width="48" height="34" rx="3" fill="{WHITE}" stroke="{STEEL_D}" stroke-width="2"/>
<path d="M5 22h54l-3-8H8z" fill="{GREEN_D}"/>
<g fill="{WHITE}"><rect x="29.5" y="15" width="5" height="6" rx="1"/><rect x="28" y="16.5" width="8" height="3" rx="1"/></g>
<rect x="14" y="30" width="14" height="13" rx="1.5" fill="#CFE3F2" stroke="{STEEL_D}" stroke-width="1.4"/>
<rect x="34" y="30" width="14" height="26" rx="1.5" fill="{WOOD}" stroke="{WOOD_D}" stroke-width="1.4"/>
<circle cx="37" cy="44" r="1.4" fill="{WHITE}"/>
<path d="M6 56h52" stroke="{STEEL_D}" stroke-width="2.4" stroke-linecap="round"/>
'''

E['syrup'] = f'''
<rect x="20" y="20" width="20" height="34" rx="4" fill="#C97B3C" stroke="#A9602B" stroke-width="1.8"/>
<rect x="24.5" y="11" width="11" height="10" rx="2" fill="{WHITE}" stroke="{STEEL_D}" stroke-width="1.6"/>
<rect x="24.5" y="11" width="11" height="3" rx="1.5" fill="{CORAL}"/>
<rect x="23" y="31" width="14" height="12" rx="1.6" fill="{WHITE}"/>
<path d="M26 35h8M26 38.5h6" stroke="{STEEL_D}" stroke-width="1.4" stroke-linecap="round"/>
<path d="M46 30c4 0 6 2.6 6 6s-2 6-6 6" fill="none" stroke="{STEEL}" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="46" cy="42" rx="6" ry="3.4" fill="{STEEL}" stroke="{STEEL_D}" stroke-width="1.4"/>
<path d="M46 42v10" stroke="{STEEL_D}" stroke-width="3" stroke-linecap="round"/>
'''

E['reporter'] = f'''
<circle cx="24" cy="15" r="5.4" fill="{SKIN}"/>
<path d="M18 23c0-2 1.8-3.6 4-3.6h4c2.2 0 4 1.6 4 3.6l1.4 13H16.6z" fill="#5A7A9A"/>
<path d="M20 36l-1 12h6l1-10" fill="#5A7A9A"/>
<path d="M28 36l2 12h-6l-1-10" fill="#5A7A9A"/>
<path d="M31 25l7 3" stroke="{SKIN}" stroke-width="3.6" stroke-linecap="round"/>
<rect x="38" y="24" width="6" height="10" rx="3" fill="{INK}"/>
<path d="M41 34v4" stroke="{INK}" stroke-width="2"/>
<rect x="34" y="38" width="16" height="12" rx="2" fill="{WHITE}" stroke="{STEEL_D}" stroke-width="1.4"/>
<path d="M37 42h9M37 45.5h7" stroke="{STEEL_D}" stroke-width="1.4" stroke-linecap="round"/>
<path d="M48 30c3 0 4 2 4 4" stroke="{STEEL_D}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
'''

E['postman'] = f'''
<circle cx="26" cy="15" r="5.4" fill="{SKIN}"/>
<path d="M19.5 15a6.5 6.5 0 0 1 13 0z" fill="#3F5875"/>
<path d="M20.5 13h11" stroke="#3F5875" stroke-width="2" stroke-linecap="round"/>
<path d="M20 23c0-2 1.8-3.6 4-3.6h4c2.2 0 4 1.6 4 3.6l1.4 13H18.6z" fill="#4C7FB5"/>
<path d="M22 36l-1 12h6l1-10" fill="#4C7FB5"/>
<path d="M30 36l2 12h-6l-1-10" fill="#4C7FB5"/>
<path d="M34 24l8 5" stroke="{SKIN}" stroke-width="3.4" stroke-linecap="round"/>
<rect x="10" y="30" width="13" height="11" rx="2" fill="{WHITE}" stroke="{STEEL_D}" stroke-width="1.5"/>
<path d="M10 30l6.5 6 6.5-6" fill="none" stroke="{STEEL_D}" stroke-width="1.5"/>
<path d="M36 30h13v12H36z" fill="{ORANGE}" stroke="{HL_D}" stroke-width="1.5"/>
<path d="M36 30l6.5 6 6.5-6" fill="none" stroke="{HL_D}" stroke-width="1.5"/>
'''

E['musician'] = f'''
<circle cx="28" cy="15" r="5.4" fill="{SKIN}"/>
<path d="M22 23c0-2 1.8-3.6 4-3.6h4c2.2 0 4 1.6 4 3.6l1.4 12H20.6z" fill="{CORAL}"/>
<path d="M23 35l-1 13h6l1-11" fill="{CORAL}"/>
<path d="M31 35l2 13h-6l-1-11" fill="{CORAL}"/>
<ellipse cx="40" cy="42" rx="9" ry="7" fill="{WOOD}" stroke="{WOOD_D}" stroke-width="1.8"/>
<circle cx="40" cy="42" r="3" fill="#8B5E3C"/>
<path d="M46 36l10-14" stroke="{WOOD_D}" stroke-width="3.4" stroke-linecap="round"/>
<path d="M54 20l4-6" stroke="{INK}" stroke-width="4.4" stroke-linecap="round"/>
<path d="M35 30l6-6" stroke="{SKIN}" stroke-width="3.4" stroke-linecap="round"/>
<g fill="{INK}"><circle cx="57" cy="16" r="1.4"/><circle cx="60" cy="20" r="1.4"/></g>
'''

# ---------------------------------------------------------------- 运动
E['goal'] = f'''
<path d="M8 18h48v34H8z" fill="none" stroke="{STEEL_D}" stroke-width="4" stroke-linejoin="round"/>
<g stroke="{STEEL_D}" stroke-width="1.2" opacity=".6">
<path d="M8 26h48M8 34h48M8 42h48M20 18v34M32 18v34M44 18v34"/>
</g>
<path d="M8 18h48v34H8z" fill="{WHITE}" opacity=".22"/>
<path d="M4 56h56" stroke="{GREEN_D}" stroke-width="4" stroke-linecap="round"/>
<circle cx="50" cy="50" r="5.4" fill="{WHITE}" stroke="{INK}" stroke-width="1.6"/>
<path d="M50 46.4l2.6 2-1 3.2h-3.2l-1-3.2z" fill="{INK}"/>
'''

E['score'] = f'''
<rect x="4" y="14" width="56" height="30" rx="4" fill="#3F5875"/>
<rect x="8" y="18" width="48" height="22" rx="2" fill="#22344A"/>
<text x="20" y="35" font-family="Segoe UI, sans-serif" font-size="16" font-weight="700" fill="{ORANGE}" text-anchor="middle">3</text>
<text x="32" y="34" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" fill="{STEEL}" text-anchor="middle">:</text>
<text x="44" y="35" font-family="Segoe UI, sans-serif" font-size="16" font-weight="700" fill="{WHITE}" text-anchor="middle">1</text>
<path d="M24 44v8M40 44v8" stroke="{STEEL_D}" stroke-width="3" stroke-linecap="round"/>
<path d="M14 54h36" stroke="{STEEL_D}" stroke-width="3" stroke-linecap="round"/>
'''

E['opponent'] = f'''
<circle cx="15" cy="20" r="6" fill="{CORAL}"/>
<path d="M9 29c0-2.4 2-4.4 4.4-4.4h3.2c2.4 0 4.4 2 4.4 4.4l1.4 13H7.6z" fill="{CORAL}"/>
<circle cx="49" cy="20" r="6" fill="{BLUE}"/>
<path d="M43 29c0-2.4 2-4.4 4.4-4.4h3.2c2.4 0 4.4 2 4.4 4.4l1.4 13H41.6z" fill="{BLUE}"/>
<path d="M32 14l-6 10h5l-3 9 9-12h-5l3-7z" fill="{ORANGE}" stroke="{HL_D}" stroke-width="1.2" stroke-linejoin="round"/>
<path d="M6 50c6-3 12-3 20 0M58 50c-6-3-12-3-20 0" stroke="{STEEL_D}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".6"/>
'''

E['player'] = f'''
<path d="M20 14l6 4h12l6-4 8 7-4 8-4-2v25H20V27l-4 2-4-8z" fill="#6D9BC8"/>
<path d="M20 14l6 4v6l-6-4z" fill="#5A87B4"/>
<path d="M44 14l-6 4v6l6-4z" fill="#5A87B4"/>
<text x="32" y="43" font-family="Segoe UI, sans-serif" font-size="18" font-weight="700" fill="{WHITE}" text-anchor="middle">9</text>
'''

# ---------------------------------------------------------------- 购物 / 计量
E['exchange'] = f'''
<rect x="6" y="30" width="18" height="18" rx="3" fill="{WOOD}" stroke="{WOOD_D}" stroke-width="1.8"/>
<path d="M6 30l9-5 9 5" fill="none" stroke="{WOOD_D}" stroke-width="1.8" stroke-linejoin="round"/>
<rect x="40" y="30" width="18" height="18" rx="3" fill="{BLUE}" stroke="#4C93D8" stroke-width="1.8"/>
<path d="M40 30l9-5 9 5" fill="none" stroke="#4C93D8" stroke-width="1.8" stroke-linejoin="round"/>
<path d="M14 22h30a6 6 0 0 1 0 12" fill="none" stroke="{ORANGE}" stroke-width="3" stroke-linecap="round"/>
<path d="M50 46H20a6 6 0 0 1 0-12" fill="none" stroke="{ORANGE}" stroke-width="3" stroke-linecap="round"/>
<path d="M41 17l5 5-5 5M23 41l-5 5 5 5" fill="none" stroke="{ORANGE}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
'''

E['liter'] = f'''
<path d="M18 12h20v6l6 10v28a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V28l6-10z" fill="#EAF6FF" stroke="{STEEL_D}" stroke-width="2.2"/>
<path d="M13 34h30v22a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4z" fill="{BLUE}" opacity=".55"/>
<path d="M44 34h6a4 4 0 0 1 0 8h-6" fill="none" stroke="{STEEL_D}" stroke-width="2.6"/>
<g stroke="{STEEL_D}" stroke-width="1.6" stroke-linecap="round">
<path d="M36 28h-5M36 38h-5M36 48h-5"/>
</g>
<text x="24" y="46" font-family="Segoe UI, sans-serif" font-size="11" font-weight="700" fill="#2E6EAF" text-anchor="middle">1 L</text>
'''

E['ingredient'] = f'''
<path d="M8 34h48l-5 18a6 6 0 0 1-6 4H19a6 6 0 0 1-6-4z" fill="#CFE3F2" stroke="{STEEL_D}" stroke-width="2"/>
<ellipse cx="32" cy="34" rx="24" ry="6" fill="#EAF6FF" stroke="{STEEL_D}" stroke-width="2"/>
<path d="M12 32c4-8 10-12 20-12s16 4 20 12z" fill="#F5EFE5" stroke="#E0D3BF" stroke-width="1.6"/>
<ellipse cx="22" cy="24" rx="5" ry="6.4" fill="#FDFBF7" stroke="#E0D3BF" stroke-width="1.4"/>
<circle cx="22" cy="24" r="2.6" fill="#F2C14E"/>
<path d="M38 18c4 0 7 3 7 7 0 3-2 5-5 6-1-4-2-7-2-13z" fill="{CORAL}"/>
<path d="M36 20c-4 2-6 5-6 8 3 0 5-1 6-3z" fill="{GREEN}"/>
'''

# ---------------------------------------------------------------- 海洋改动
E['seal'] = f'''
<path d="M6 50c8-4 16-4 24 0 8 4 16 4 24 0v6H6z" fill="#EAF6FF"/>
<ellipse cx="30" cy="42" rx="17" ry="10" fill="{GREY}"/>
<circle cx="43" cy="30" r="8.4" fill="{GREY}"/>
<path d="M34 46c-5 2-10 2-15 0" stroke="#9AA6AE" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M24 52c-4 2-7 2-10 0 2-4 6-5 10-3z" fill="#9AA6AE"/>
<g fill="{INK}"><circle cx="46" cy="28" r="1.5"/></g>
<circle cx="40" cy="28" r="1.5" fill="{INK}"/>
<path d="M47 33l7-1M47 35l7 2" stroke="#9AA6AE" stroke-width="1.4" stroke-linecap="round"/>
<circle cx="48.5" cy="34.5" r="1.6" fill="#5C6B76"/>
<path d="M32 36c3-2 6-2 9 0" stroke="#9AA6AE" stroke-width="1.6" fill="none" stroke-linecap="round"/>
'''

E['windowsill'] = f'''
<rect x="20" y="8" width="30" height="26" rx="2" fill="#CFE3F2" stroke="{WOOD_D}" stroke-width="2.4"/>
<path d="M35 8v26M20 21h30" stroke="{WOOD_D}" stroke-width="2.4"/>
<path d="M8 34h48l-2 6H10z" fill="{WOOD}" stroke="{WOOD_D}" stroke-width="2"/>
<rect x="12" y="40" width="40" height="5" fill="{WOOD_D}"/>
<path d="M14 45v13M50 45v13" stroke="{WOOD_D}" stroke-width="2.6" stroke-linecap="round"/>
<rect x="24" y="26" width="12" height="8" rx="1.5" fill="#D97B5A" stroke="#B45F42" stroke-width="1.4"/>
<path d="M30 26c-1-4-3-6-6-7M30 26c1-4 3-6 6-6" stroke="{GREEN_D}" stroke-width="2" fill="none" stroke-linecap="round"/>
<g fill="{GREEN}"><ellipse cx="23" cy="18" rx="3.4" ry="2.4"/><ellipse cx="37" cy="19" rx="3.4" ry="2.4"/></g>
'''

E.pop('heat-haze-gap', None)

def write_all():
    os.makedirs(OUT, exist_ok=True)
    svg_open = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">'
    for name, inner in E.items():
        with open(os.path.join(OUT, name + '.svg'), 'w', encoding='utf-8', newline='\n') as f:
            f.write(svg_open + inner.strip() + '</svg>\n')
    print('wrote', len(E), 'fixed icons')


if __name__ == '__main__':
    write_all()