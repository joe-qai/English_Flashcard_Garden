# -*- coding: utf-8 -*-
"""Rewrite icon (or swatch) fields in assets/words.js.

Only touches the exact (category, word) pairs listed below, so nothing else
in the data file changes.
"""
import re

PATH = 'assets/words.js'

S = 'assets/icons/'

# (category id, English word) -> new icon value
ICON_FIXES = {
    # ---- fruits: no accurate emoji exists for these ----
    ('fruits', 'pomelo'): S + 'pomelo.svg',
    ('fruits', 'dragon fruit'): S + 'dragon-fruit.svg',
    ('fruits', 'longan'): S + 'longan.svg',
    ('fruits', 'lime'): S + 'lime.svg',
    ('fruits', 'plum'): S + 'plum.svg',
    ('fruits', 'lychee'): S + 'lychee.svg',
    ('fruits', 'grapefruit'): S + 'grapefruit.svg',

    # ---- stationery ----
    ('stationery', 'eraser'): S + 'eraser.svg',
    ('stationery', 'glue'): S + 'glue.svg',
    ('stationery', 'stapler'): S + 'stapler.svg',
    ('stationery', 'marker'): S + 'marker.svg',
    ('stationery', 'stamp'): S + 'stamp.svg',
    ('stationery', 'compass'): S + 'compass.svg',
    ('stationery', 'calculator'): S + 'calculator.svg',

    # ---- furniture: emoji set has no table / cabinet / fridge / wardrobe ... ----
    ('furniture', 'table'): S + 'table.svg',
    ('furniture', 'cabinet'): S + 'cabinet.svg',
    ('furniture', 'bookshelf'): S + 'bookshelf.svg',
    ('furniture', 'refrigerator'): S + 'refrigerator.svg',
    ('furniture', 'air conditioner'): S + 'air-conditioner.svg',
    ('furniture', 'electric fan'): S + 'electric-fan.svg',
    ('furniture', 'power strip'): S + 'power-strip.svg',
    ('furniture', 'wardrobe'): S + 'wardrobe.svg',
    ('furniture', 'drawer'): S + 'drawer.svg',
    ('furniture', 'stool'): S + 'stool.svg',
    ('furniture', 'curtain'): S + 'curtain.svg',
    ('furniture', 'carpet'): S + 'carpet.svg',
    ('furniture', 'blanket'): S + 'blanket.svg',
    ('furniture', 'washing machine'): S + 'washing-machine.svg',
    ('furniture', 'mirror'): S + 'mirror.svg',
    ('furniture', 'window'): S + 'window.svg',
    ('furniture', 'heater'): S + 'heater.svg',

    # ---- kitchenware ----
    ('kitchenware', 'air fryer'): S + 'air-fryer.svg',
    ('kitchenware', 'oven'): S + 'oven.svg',
    ('kitchenware', 'gas stove'): S + 'gas-stove.svg',
    ('kitchenware', 'range hood'): S + 'range-hood.svg',
    ('kitchenware', 'kettle'): S + 'kettle.svg',
    ('kitchenware', 'toaster'): S + 'toaster.svg',
    ('kitchenware', 'blender'): S + 'blender.svg',
    ('kitchenware', 'napkin'): S + 'napkin.svg',
    ('kitchenware', 'scale'): S + 'kitchen-scale.svg',

    # ---- jurassic ----
    ('jurassic', 'pterodactyl'): S + 'pterodactyl.svg',
    ('jurassic', 'triceratops'): S + 'triceratops.svg',
    ('jurassic', 'stegosaurus'): S + 'stegosaurus.svg',
    ('jurassic', 'ankylosaurus'): S + 'ankylosaurus.svg',
    ('jurassic', 'mosasaurus'): S + 'mosasaurus.svg',
    ('jurassic', 'amber'): S + 'amber.svg',

    # ---- marine ----
    ('marine', 'jellyfish'): S + 'jellyfish.svg',
    ('marine', 'starfish'): S + 'starfish.svg',
    ('marine', 'seahorse'): S + 'seahorse.svg',
    ('marine', 'coral'): S + 'coral.svg',

    # ---- military ----
    ('military', 'bow'): S + 'bow.svg',
    ('military', 'grenade'): S + 'grenade.svg',
    ('military', 'submarine'): S + 'submarine.svg',
    ('military', 'cannon'): S + 'cannon.svg',
    ('military', 'armor'): S + 'armor.svg',

    # ---- clothing ----
    ('clothing', 'skirt'): S + 'skirt.svg',
    ('clothing', 'pajamas'): S + 'pajamas.svg',
    ('clothing', 'sweater'): S + 'sweater.svg',
    ('clothing', 'belt'): S + 'belt.svg',
    ('clothing', 'zipper'): S + 'zipper.svg',
    ('clothing', 'button'): S + 'button.svg',
    ('clothing', 'collar'): S + 'collar.svg',

    # ---- body ----
    ('body', 'forehead'): S + 'forehead.svg',
    ('body', 'head'): S + 'head.svg',
    ('body', 'hair'): S + 'hair.svg',
    ('body', 'neck'): S + 'neck.svg',
    ('body', 'shoulder'): S + 'shoulder.svg',
    ('body', 'arm'): S + 'arm.svg',
    ('body', 'elbow'): S + 'elbow.svg',
    ('body', 'wrist'): S + 'wrist.svg',
    ('body', 'chest'): S + 'chest.svg',
    ('body', 'stomach'): S + 'stomach.svg',
    ('body', 'waist'): S + 'waist.svg',
    ('body', 'knee'): S + 'knee.svg',

    # ---- health / rooms / tools / sports / shopping ----
    ('health', 'pill'): S + 'pill.svg',
    ('rooms', 'stairs'): S + 'stairs.svg',
    ('rooms', 'basement'): S + 'basement.svg',
    ('rooms', 'ceiling'): S + 'ceiling.svg',
    ('rooms', 'floor'): S + 'floor.svg',
    ('tools', 'drill'): S + 'drill.svg',
    ('tools', 'pliers'): S + 'pliers.svg',
    ('tools', 'tape'): S + 'tape.svg',
    ('tools', 'switch'): S + 'switch.svg',
    ('sports-general', 'referee'): S + 'referee.svg',
    ('shopping', 'shelf'): S + 'shelf.svg',
    ('shopping', 'checkout'): S + 'cash-register.svg',

    # =====================================================================
    # Image-uniqueness pass: every one of the 648 words now owns its own
    # picture. One member of each former duplicate group keeps the literal
    # emoji; every other member gets a distinct emoji or a dedicated SVG.
    # =====================================================================

    # ---- plants / seasons / solar terms (shared 🌿🍃🌱🌾🌸🌻🍁🍂❄️🌨️) ----
    ('marine', 'seaweed'): S + 'seaweed.svg',
    ('plants', 'grass'): S + 'grass.svg',
    ('plants', 'vine'): S + 'vine.svg',
    ('plants', 'willow'): S + 'willow.svg',
    ('plants', 'branch'): S + 'branch.svg',
    ('plants', 'oak'): S + 'oak.svg',
    ('plants', 'palm'): S + 'palm.svg',
    ('solar-terms', 'Clear and Bright'): S + 'clear-and-bright.svg',
    ('solar-terms', 'Grain Rain'): S + 'grain-rain.svg',
    ('solar-terms', 'Grain in Ear'): S + 'grain-in-ear.svg',
    ('solar-terms', 'White Dew'): S + 'white-dew.svg',
    ('solar-terms', 'Grain Full'): S + 'grain-full.svg',
    ('solar-terms', 'Beginning of Autumn'): S + 'beginning-of-autumn.svg',
    ('solar-terms', 'Major Cold'): S + 'major-cold.svg',
    ('solar-terms', 'Major Heat'): '\U0001F975',          # 🥵 大暑
    ('solar-terms', 'Minor Heat'): S + 'minor-heat.svg',
    ('solar-terms', 'Minor Cold'): S + 'minor-cold.svg',
    ('solar-terms', 'Cold Dew'): S + 'cold-dew.svg',
    ('solar-terms', 'Beginning of Spring'): S + 'beginning-of-spring.svg',
    ('solar-terms', 'Beginning of Summer'): S + 'beginning-of-summer.svg',
    ('solar-terms', 'Spring Equinox'): S + 'spring-equinox.svg',
    ('solar-terms', 'Autumn Equinox'): '\U0001F330',      # 🌰 秋分
    ('seasons', 'solstice'): S + 'solstice.svg',
    ('seasons', 'equinoxa'): S + 'equinoxa.svg',
    ('seasons', 'vernal'): '\U0001F423',                  # 🐣 春季的
    ('seasons', 'cool'): '\U0001F9CA',                    # 🧊 凉爽的
    ('weather', 'breeze'): '\U0001F390',                  # 🎐 微风
    ('seasons', 'harvest'): S + 'harvest.svg',
    ('seasons', 'equinox'): '\U0001F317',                 # 🌗 分日
    ('seasons', 'spring'): '\U0001F41D',                  # 🐝 春天
    ('seasons', 'estival'): '\U0001F576\uFE0F',           # 🕶️ 夏季的
    ('seasons', 'autumnal'): '\U0001F383',                # 🎃 秋季的
    ('seasons', 'winter'): '\U0001F9E3',                  # 🧣 冬天
    ('seasons', 'hibernal'): '\U0001F3D4\uFE0F',          # 🏔️ 冬季的
    ('seasons', 'warm'): '\U0001F506',                    # 🔆 温暖的
    ('seasons', 'seasonal'): S + 'seasonal.svg',
    ('seasons', 'cold'): '\U0001F976',                    # 🥶 寒冷的
    ('seasons', 'renewal'): '\u267B\uFE0F',               # ♻️ 更新
    ('seasons', 'bloom'): S + 'bloom.svg',
    ('seasons', 'sprout'): S + 'sprout.svg',
    ('seasons', 'thaw'): S + 'thaw.svg',

    # ---- measure / shopping duplicates (📏💧⚖️🪙🥛🥚🍫🍞🍚) ----
    ('measure', 'meter'): S + 'meter-stick.svg',
    ('measure', 'centimeter'): S + 'centimeter.svg',
    ('measure', 'portion'): S + 'portion.svg',
    ('measure', 'milliliter'): S + 'milliliter.svg',
    ('measure', 'kilogram'): S + 'kilogram.svg',
    ('measure', 'gram'): S + 'gram.svg',
    ('measure', 'ounce'): S + 'ounce.svg',
    ('measure', 'quart'): S + 'quart.svg',
    ('measure', 'dozen'): S + 'dozen-eggs.svg',
    ('measure', 'bar'): S + 'chocolate-bar.svg',
    ('measure', 'pair'): S + 'pair-shoes.svg',
    ('measure', 'ton'): S + 'ton.svg',
    ('measure', 'pound'): S + 'pound.svg',
    ('measure', 'dash'): S + 'dash.svg',
    ('measure', 'precise'): '\U0001F50E',                # 🔎 精确的
    ('measure', 'roughly'): S + 'roughly.svg',
    ('measure', 'exactly'): '\U0001F4AF',                 # 💯 确切地
    ('shopping', 'size'): S + 'size.svg',
    ('shopping', 'aisle'): S + 'aisle.svg',
    ('shopping', 'return'): S + 'return.svg',
    ('shopping', 'change'): '\U0001F4B1',                 # 💱 找零
    ('shopping', 'wrap'): '\U0001F380',                   # 🎀 包装
    ('shopping', 'fit'): S + 'fit.svg',
    ('shopping', 'sale'): S + 'sale.svg',
    ('shopping', 'exchange'): '\U0001F500',               # 🔀 换货
    ('hobbies', 'coin'): S + 'coin.svg',

    # ---- kitchen / food ----
    ('kitchenware', 'pot'): S + 'pot.svg',
    ('kitchenware', 'rice cooker'): S + 'rice-cooker.svg',
    ('kitchenware', 'teapot'): S + 'teapot.svg',
    ('measure', 'slice'): S + 'slice-bread.svg',
    ('fruits', 'tangerine'): S + 'tangerine.svg',

    # ---- marine / jurassic / military ----
    ('marine', 'eel'): S + 'eel.svg',
    ('marine', 'salmon'): S + 'salmon.svg',
    ('marine', 'stingray'): S + 'stingray.svg',
    ('marine', 'ocean'): S + 'ocean.svg',
    ('marine', 'seal'): S + 'seal.svg',
    ('jurassic', 'velociraptor'): S + 'velociraptor.svg',
    ('jurassic', 'raptor'): S + 'raptor.svg',
    ('jurassic', 'diplodocus'): S + 'diplodocus.svg',
    ('jurassic', 'prehistoric'): '\U0001F5FF',            # 🗿 史前的
    ('jurassic', 'extinct'): '\u26B0\uFE0F',              # ⚰️ 灭绝的
    ('jurassic', 'ancient'): '\U0001F3FA',                # 🏺 古代的
    ('military', 'rifle'): S + 'rifle.svg',
    ('military', 'pistol'): S + 'pistol.svg',
    ('military', 'jet'): S + 'jet.svg',
    ('tools', 'maintenance'): S + 'maintenance.svg',

    # ---- weather / nature ----
    ('weather', 'sunny'): '\U0001F324\uFE0F',             # 🌤️ 晴朗的
    ('weather', 'humidity'): '\U0001F4A6',                # 💦 湿度
    ('weather', 'downpour'): S + 'downpour.svg',
    ('weather', 'rainy'): '\u2614',                       # ☔ 下雨的
    ('weather', 'shower'): S + 'shower-rain.svg',
    ('weather', 'blizzard'): S + 'blizzard.svg',
    ('weather', 'snowy'): S + 'snowy-house.svg',
    ('weather', 'forecast'): S + 'forecast.svg',
    ('weather', 'typhoon'): S + 'typhoon.svg',
    ('weather', 'flood'): S + 'flood.svg',

    # ---- time / festivals ----
    ('time', 'afternoon'): '\U0001F553',                  # 🕓 下午
    ('time', 'epoch'): S + 'epoch.svg',
    ('time', 'season'): S + 'season-wheel.svg',
    ('time', 'weekend'): S + 'weekend-calendar.svg',
    ('time', 'tomorrow'): '\U0001F4C6',                   # 📆 明天
    ('time', 'early'): '\U0001F304',                      # 🌄 早的
    ('time', 'morning'): '\U0001F305',                    # 🌅 早晨
    ('time', 'today'): S + 'today.svg',
    ('time', 'deadline'): '\u231B',                       # ⌛ 截止日期
    ('time', 'weekday'): S + 'weekday.svg',
    ('time', 'anniversary'): '\U0001F48D',                # 💍 纪念日
    ('time', 'lately'): S + 'lately.svg',
    ('time', 'late'): S + 'late.svg',
    ('time', 'schedule'): '\U0001F5D3\uFE0F',             # 🗓️ 日程表
    ('festivals', 'feast'): '\U0001F958',                 # 🥘 盛宴
    ('festivals', 'gather'): S + 'gather.svg',
    ('festivals', 'streamer'): S + 'streamer.svg',
    ('festivals', 'parade'): '\U0001F3BA',                # 🎺 游行
    ('festivals', 'decoration'): '\U0001F388',            # 🎈 装饰
    ('festivals', 'congratulation'): '\U0001F973',        # 🥳 祝贺
    ('festivals', 'present'): S + 'present.svg',
    ('festivals', 'snowman'): '\u2603\uFE0F',             # ☃️ 雪人
    ('festivals', 'candle'): S + 'candle.svg',
    ('festivals', 'blow out'): S + 'blow-out.svg',
    ('festivals', 'tradition'): S + 'tradition.svg',
    ('festivals', 'ceremony'): S + 'ceremony.svg',

    # ---- rooms / garage ----
    ('rooms', 'dining room'): S + 'dining-room.svg',
    ('rooms', 'fireplace'): S + 'fireplace.svg',
    ('rooms', 'hearth'): S + 'hearth.svg',
    ('rooms', 'hallway'): S + 'hallway.svg',
    ('rooms', 'bedroom'): S + 'bedroom.svg',
    ('rooms', 'living room'): S + 'living-room.svg',
    ('rooms', 'bathroom'): '\U0001F6BF',                  # 🚿 浴室
    ('rooms', 'kitchen'): S + 'kitchen.svg',
    ('rooms', 'garage'): S + 'garage.svg',
    ('rooms', 'balcony'): S + 'balcony.svg',
    ('rooms', 'staircase'): S + 'staircase.svg',
    ('rooms', 'windowsill'): S + 'windowsill.svg',
    ('rooms', 'yard'): S + 'yard.svg',
    ('rooms', 'garden'): S + 'garden.svg',

    # ---- tools ----
    ('tools', 'tape measure'): S + 'tape-measure.svg',
    ('tools', 'leak'): S + 'leak.svg',
    ('tools', 'tighten'): S + 'tighten.svg',
    ('tools', 'nail'): S + 'nail.svg',
    ('tools', 'screwdriver'): S + 'screwdriver.svg',
    ('tools', 'saw'): S + 'saw.svg',
    ('tools', 'caulk'): S + 'caulk.svg',
    ('tools', 'fuse'): S + 'fuse.svg',
    ('tools', 'clog'): S + 'clog.svg',
    ('tools', 'gloves'): S + 'gloves.svg',

    # ---- health / clothing ----
    ('health', 'flu'): '\U0001F6CC',                      # 🛌 流感
    ('health', 'allergy'): S + 'allergy.svg',
    ('health', 'check-up'): S + 'check-up.svg',
    ('health', 'thermometer'): S + 'thermometer.svg',
    ('health', 'patient'): S + 'patient.svg',
    ('health', 'sick'): '\U0001F92E',                     # 🤮 生病的
    ('health', 'clinic'): S + 'clinic.svg',
    ('clothing', 'coat'): S + 'coat.svg',
    ('clothing', 'cardigan'): S + 'cardigan.svg',
    ('clothing', 'trousers'): S + 'trousers.svg',
    ('shopping', 'try on'): S + 'try-on.svg',
    ('clothing', 'slippers'): '\U0001F97F',               # 🥿 拖鞋

    # ---- jobs / hobbies / sports ----
    ('jobs', 'waiter'): S + 'waiter.svg',
    ('jobs', 'pilot'): '\U0001F468\u200D\u2708\uFE0F',     # 👨‍✈️ 飞行员
    ('jobs', 'manager'): S + 'manager.svg',
    ('jobs', 'driver'): S + 'driver.svg',
    ('jobs', 'dentist'): S + 'dentist.svg',
    ('jobs', 'pharmacist'): S + 'pharmacist.svg',
    ('jobs', 'surgeon'): '\U0001F97C',                    # 🥼 外科医生
    ('jobs', 'salary'): S + 'salary.svg',
    ('hobbies', 'gardening'): '\U0001F9D1\u200D\U0001F33E', # 🧑‍🌾 园艺
    ('hobbies', 'drawing'): S + 'drawing.svg',
    ('hobbies', 'gallery'): '\U0001F5BC\uFE0F',           # 🖼️ 画廊
    ('hobbies', 'cooking'): S + 'cooking.svg',
    ('hobbies', 'writing'): S + 'writing.svg',
    ('hobbies', 'painting'): S + 'painting.svg',
    ('hobbies', 'photography'): '\U0001F4F8',             # 📸 摄影
    ('hobbies', 'philately'): S + 'philately.svg',
    ('sports-general', 'warm-up'): S + 'warm-up.svg',
    ('sports-general', 'competition'): S + 'competition.svg',
    ('sports-general', 'team'): '\U0001F91D',             # 🤝 队伍
    ('sports-general', 'yoga'): '\U0001F9D8\u200D\u2640\uFE0F', # 🧘‍♀️ 瑜伽
    ('sports-general', 'training'): '\U0001F4AA',         # 💪 训练
    ('sports-general', 'stamina'): S + 'stamina.svg',
    ('sports-general', 'jogging'): S + 'jogging.svg',

    # ---- remaining pairs ----
    ('transport', 'distance'): '\U0001F6E3\uFE0F',        # 🛣️ 距离
    ('transport', 'platform'): S + 'platform.svg',
    ('festivals', 'wish'): '\U0001F320',                  # 🌠 愿望
    ('measure', 'recipe'): S + 'recipe.svg',
}

# category id -> {en: swatch hex}
SWATCHES = {
    'colors': {
        'red': '#E23B3B', 'blue': '#2F6FD0', 'green': '#3E9C52', 'yellow': '#F2C230',
        'rust': '#B4552D', 'purple': '#7B4FA8', 'pink': '#F089B0', 'black': '#1C1C1E',
        'white': '#FFFFFF', 'brown': '#7A5236', 'gray': '#9AA0A6', 'gold': '#D4A017',
        'silver': '#C0C6CC', 'navy': '#1F2E5A', 'light blue': '#9FCBEE', 'dark green': '#1F5C34',
        'beige': '#E4D5BC', 'lavender': '#B79FD4', 'maroon': '#7B2B33', 'olive': '#6E7A32',
        'teal': '#167C80', 'mint': '#A8E6CF', 'ivory': '#F6F1E3', 'sky blue': '#87CEEB',
    },
}

LINE_RE = re.compile(
    r"^(?P<indent>\s*)\{ en: '(?P<en>[^']+)', ipa: '(?P<ipa>[^']*)', zh: '(?P<zh>[^']+)', icon: '(?P<icon>(?:[^'\\]|\\.)*)' \},$"
)
CAT_RE = re.compile(r"^\s*id: '([a-z0-9-]+)',\s*$")

lines = open(PATH, encoding='utf-8').read().split('\n')
cat = None
changed = 0
seen = set()
for i, line in enumerate(lines):
    m = CAT_RE.match(line)
    if m:
        cat = m.group(1)
        continue
    m = LINE_RE.match(line)
    if not m:
        continue
    en = m.group('en')
    seen.add((cat, en))
    new_icon = ICON_FIXES.get((cat, en))
    new_swatch = SWATCHES.get(cat, {}).get(en)
    if new_icon:
        lines[i] = "%s{ en: '%s', ipa: '%s', zh: '%s', icon: '%s' }," % (
            m.group('indent'), en, m.group('ipa'), m.group('zh'), new_icon)
        changed += 1
    elif new_swatch:
        lines[i] = "%s{ en: '%s', ipa: '%s', zh: '%s', swatch: '%s' }," % (
            m.group('indent'), en, m.group('ipa'), m.group('zh'), new_swatch)
        changed += 1

missing = [k for k in ICON_FIXES if k not in seen]
missing_sw = [k for k in SWATCHES['colors'] if ('colors', k) not in seen]

open(PATH, 'w', encoding='utf-8', newline='\n').write('\n'.join(lines))
print('lines changed:', changed)
print('missing targets:', missing)
print('missing swatches:', missing_sw)