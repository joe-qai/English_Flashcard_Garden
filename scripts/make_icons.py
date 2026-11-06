# -*- coding: utf-8 -*-
"""Generate assets/icons/*.svg.

Rules: 64x64 viewBox, flat vector, warm palette that matches the site.
Every icon must read as the real object at 56px.
Run: python scripts/make_icons.py
"""
import os

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'assets', 'icons')

INK = '#2A2A2E'
EDGE = 'stroke="%s" stroke-opacity=".16" stroke-width="2"' % INK
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

ICONS = {}

ICONS['dragon-fruit'] = f'''
<ellipse cx="32" cy="35" rx="16" ry="21" fill="#E8557F"/>
<ellipse cx="27" cy="29" rx="5" ry="8" fill="#F27F9E" opacity=".55"/>
<path d="M32 14c0-5 3-8 3-8" stroke="{GREEN_D}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<path d="M18 24c-4-1-7 1-8 3 3 2 6 2 9 0z" fill="{GREEN}"/>
<path d="M46 24c4-1 7 1 8 3-3 2-6 2-9 0z" fill="{GREEN}"/>
<path d="M15 35c-4 1-6 4-6 7 3 0 6-2 8-5z" fill="{GREEN}"/>
<path d="M49 35c4 1 6 4 6 7-3 0-6-2-8-5z" fill="{GREEN}"/>
<path d="M19 46c-3 2-4 5-3 8 3-1 5-4 6-7z" fill="{GREEN}"/>
<path d="M45 46c3 2 4 5 3 8-3-1-5-4-6-7z" fill="{GREEN}"/>
<path d="M32 52c-1 4 0 7 1 9 2-2 3-5 2-9z" fill="{GREEN}"/>
<circle cx="24" cy="34" r="1.3" fill="#FBE3EA"/>
<circle cx="36" cy="42" r="1.3" fill="#FBE3EA"/>
<circle cx="32" cy="27" r="1.3" fill="#FBE3EA"/>
'''

ICONS['pomelo'] = f'''
<path d="M32 13c-11 0-20 9-20 21 0 13 9 21 20 21s20-8 20-21c0-12-9-21-20-21z" fill="#E7D98B"/>
<path d="M32 13c-7 0-13 4-17 10 5 3 11 4 17 4s12-1 17-4c-4-6-10-10-17-10z" fill="#EFE6A9" opacity=".8"/>
<path d="M32 13c-1-5 0-7 1-8 2 2 3 5 2 8z" fill="{GREEN_D}"/>
<path d="M35 12c3-4 7-5 10-4-1 3-4 5-8 6z" fill="{GREEN}"/>
<path d="M20 32c2 8 6 12 12 13" stroke="#F7F0C4" stroke-width="2.4" fill="none" stroke-linecap="round"/>
'''

ICONS['longan'] = f'''
<path d="M32 12c-2 4-2 7-1 10" stroke="#7A5A3A" stroke-width="2.6" fill="none" stroke-linecap="round"/>
<path d="M32 20c-4-2-8-2-11 0M32 20c4-2 8-2 11 0" stroke="#7A5A3A" stroke-width="2" fill="none" stroke-linecap="round"/>
<circle cx="22" cy="36" r="11" fill="#C89B62"/>
<circle cx="42" cy="36" r="11" fill="#BE8F55"/>
<circle cx="32" cy="50" r="10" fill="#D2A870"/>
<circle cx="22" cy="36" r="6" fill="#B0803F" opacity=".35"/>
<circle cx="42" cy="36" r="6" fill="#B0803F" opacity=".3"/>
<circle cx="32" cy="50" r="5" fill="#B0803F" opacity=".3"/>
<circle cx="18" cy="32" r="2" fill="#E4C79A" opacity=".8"/>
<circle cx="38" cy="32" r="2" fill="#E4C79A" opacity=".7"/>
'''

ICONS['lime'] = f'''
<circle cx="32" cy="35" r="18" fill="#8FBF6E"/>
<circle cx="32" cy="35" r="18" fill="none" stroke="#6C9A4E" stroke-width="2"/>
<circle cx="32" cy="35" r="12" fill="#A9D386"/>
<path d="M32 23v24M20 35h24M23.5 26.5l17 17M40.5 26.5l-17 17" stroke="#7FAF5F" stroke-width="1.6" opacity=".75"/>
<circle cx="32" cy="35" r="3.4" fill="#F4F8E8"/>
<path d="M30 17c-2-4-1-7 1-9 2 2 3 6 1 9z" fill="{GREEN_D}"/>
'''

ICONS['plum'] = f'''
<ellipse cx="32" cy="36" rx="17" ry="19" fill="#7C4B8E"/>
<ellipse cx="26" cy="30" rx="5" ry="8" fill="#9A66AD" opacity=".55"/>
<path d="M32 18c0-5 1-8 3-10" stroke="#6B4A2F" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<path d="M35 12c4-3 8-3 11-1-2 3-6 5-10 4z" fill="{GREEN}"/>
<path d="M32 20c-1 8-1 20 0 30" stroke="#5C3468" stroke-width="1.8" fill="none" opacity=".55"/>
<path d="M22 28c-1 6 0 13 3 18" stroke="#B183C2" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
'''

ICONS['lychee'] = f'''
<circle cx="32" cy="37" r="18" fill="#D8455F"/>
<circle cx="32" cy="37" r="18" fill="none" stroke="#B22F47" stroke-width="1.6" opacity=".6"/>
<g fill="#F0909F" opacity=".8">
<circle cx="24" cy="30" r="1.4"/><circle cx="31" cy="27" r="1.4"/><circle cx="39" cy="31" r="1.4"/>
<circle cx="21" cy="39" r="1.4"/><circle cx="30" cy="36" r="1.4"/><circle cx="41" cy="40" r="1.4"/>
<circle cx="25" cy="47" r="1.4"/><circle cx="34" cy="46" r="1.4"/><circle cx="40" cy="48" r="1.4"/>
</g>
<path d="M32 19c0-4 1-7 3-9" stroke="#7A5A3A" stroke-width="2.6" fill="none" stroke-linecap="round"/>
<path d="M34 12c3-4 7-5 10-3-1 3-5 6-9 5z" fill="{GREEN_D}"/>
'''

ICONS['grapefruit'] = f'''
<circle cx="32" cy="34" r="19" fill="#E9A94D"/>
<circle cx="32" cy="34" r="19" fill="none" stroke="#CE8B33" stroke-width="2"/>
<circle cx="32" cy="34" r="15" fill="#FBE6CE"/>
<circle cx="32" cy="34" r="13" fill="#F0757F"/>
<g stroke="#FBD9DC" stroke-width="1.8">
<path d="M32 21v26M19 34h26M23 25l18 18M41 25L23 43"/>
</g>
<circle cx="32" cy="34" r="2.6" fill="#FCEBEA"/>
<path d="M32 15c-3-3-7-3-9-1 2 3 6 4 9 3z" fill="{GREEN}"/>
'''

ICONS['eraser'] = f'''
<rect x="14" y="30" width="36" height="18" rx="4" fill="#F4A0AE" transform="rotate(-14 32 39)"/>
<rect x="14" y="30" width="12" height="18" rx="4" fill="#E8E2D6" transform="rotate(-14 32 39)"/>
<path d="M28 34l14 12" stroke="#FFFFFF" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>
'''

ICONS['glue'] = f'''
<rect x="24" y="18" width="16" height="34" rx="5" fill="{WHITE}" stroke="{INK}" stroke-opacity=".14" stroke-width="2"/>
<rect x="26" y="30" width="12" height="16" rx="2" fill="{ORANGE}" opacity=".85"/>
<path d="M28 18V12h8v6" fill="{ORANGE}" stroke="{ORANGE}" stroke-width="4" stroke-linejoin="round"/>
<path d="M32 12v-4" stroke="{WOOD_D}" stroke-width="3" stroke-linecap="round"/>
<path d="M18 48c2-4 6-4 8 0 2 4-2 8-4 8s-6-4-4-8z" fill="{BLUE}" opacity=".55"/>
'''

ICONS['stapler'] = f'''
<rect x="9" y="44" width="42" height="8" rx="4" fill="#4E5762"/>
<path d="M13 43l2-13a4 4 0 0 1 4-3.5h29a4 4 0 0 1 4 3.5l1 13z" fill="{ORANGE}"/>
<path d="M17 34h34" stroke="#FFFFFF" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/>
<circle cx="18" cy="42" r="3.4" fill="{STEEL_D}"/>
<circle cx="18" cy="42" r="1.2" fill="{CREAM}"/>
<path d="M36 48h14" stroke="{ORANGE}" stroke-width="2.4" stroke-linecap="round" opacity=".9"/>
'''

ICONS['marker'] = f'''
<rect x="24" y="12" width="16" height="34" rx="4" fill="#4E7FB8"/>
<rect x="24" y="12" width="16" height="10" rx="4" fill="#2F5C8C"/>
<path d="M26 46h12l-3 8h-6z" fill="#E7E3DA" stroke="{INK}" stroke-opacity=".12" stroke-width="1.6"/>
<path d="M29 54h6l-3 5z" fill="{ORANGE}"/>
<rect x="27" y="22" width="4" height="16" rx="2" fill="#FFFFFF" opacity=".35"/>
'''

ICONS['stamp'] = f'''
<rect x="12" y="11" width="40" height="42" rx="3" fill="#F4EDE0" stroke="{INK}" stroke-opacity=".12" stroke-width="2"/>
<rect x="12" y="11" width="40" height="42" rx="3" fill="none" stroke="#F4EDE0" stroke-width="6" stroke-dasharray="3 4"/>
<rect x="18" y="18" width="28" height="28" fill="#DCEAF2"/>
<circle cx="32" cy="28" r="6.5" fill="{CORAL}"/>
<path d="M22 42c2-7 5-10 10-10s8 3 10 10z" fill="{BLUE}"/>
<g stroke="#C96F6F" stroke-width="2" fill="none" opacity=".75">
<circle cx="45" cy="45" r="8"/>
<path d="M39 45h12M45 39v12"/>
</g>
'''

ICONS['compass'] = f'''
<path d="M32 10l-9 40" stroke="{STEEL_D}" stroke-width="4.5" stroke-linecap="round"/>
<path d="M32 10l9 40" stroke="#4E7FB8" stroke-width="4.5" stroke-linecap="round"/>
<circle cx="32" cy="11" r="4.5" fill="{ORANGE}" stroke="{INK}" stroke-opacity=".15" stroke-width="1.5"/>
<path d="M41 48l-3 6h6z" fill="{INK}" opacity=".75"/>
<path d="M23 48l3 6h-6z" fill="{INK}" opacity=".55"/>
<path d="M24 26h16" stroke="{INK}" stroke-opacity=".2" stroke-width="2"/>
'''

ICONS['calculator'] = f'''
<rect x="14" y="10" width="36" height="44" rx="6" fill="#5B6470"/>
<rect x="19" y="15" width="26" height="11" rx="2.5" fill="#D8E9D2"/>
<g fill="{CREAM}">
<rect x="19" y="31" width="7" height="6" rx="1.6"/><rect x="28.5" y="31" width="7" height="6" rx="1.6"/><rect x="38" y="31" width="7" height="6" rx="1.6"/>
<rect x="19" y="40" width="7" height="6" rx="1.6"/><rect x="28.5" y="40" width="7" height="6" rx="1.6"/><rect x="38" y="40" width="7" height="6" rx="1.6"/>
</g>
<rect x="19" y="49" width="16.5" height="4" rx="2" fill="{ORANGE}"/>
<rect x="38" y="49" width="7" height="4" rx="2" fill="{CORAL}"/>
'''

ICONS['table'] = f'''
<rect x="8" y="24" width="48" height="7" rx="3" fill="{WOOD}"/>
<rect x="13" y="31" width="5" height="22" rx="2" fill="{WOOD_D}"/>
<rect x="46" y="31" width="5" height="22" rx="2" fill="{WOOD_D}"/>
<rect x="22" y="31" width="4" height="17" rx="2" fill="{WOOD_D}" opacity=".55"/>
<rect x="38" y="31" width="4" height="17" rx="2" fill="{WOOD_D}" opacity=".55"/>
<rect x="8" y="24" width="48" height="3" rx="1.5" fill="#F0C99C" opacity=".7"/>
'''

ICONS['cabinet'] = f'''
<rect x="12" y="16" width="40" height="34" rx="4" fill="{WOOD}"/>
<rect x="12" y="16" width="40" height="34" rx="4" fill="none" stroke="{INK}" stroke-opacity=".12" stroke-width="2"/>
<path d="M32 18v30" stroke="{WOOD_D}" stroke-width="2.5"/>
<rect x="18" y="23" width="9" height="18" rx="2" fill="{WOOD_D}" opacity=".45"/>
<rect x="37" y="23" width="9" height="18" rx="2" fill="{WOOD_D}" opacity=".45"/>
<circle cx="28" cy="33" r="2" fill="{INK}" opacity=".6"/>
<circle cx="36" cy="33" r="2" fill="{INK}" opacity=".6"/>
<rect x="15" y="50" width="4" height="6" rx="1.5" fill="{WOOD_D}"/>
<rect x="45" y="50" width="4" height="6" rx="1.5" fill="{WOOD_D}"/>
'''

ICONS['window'] = f'''
<rect x="10" y="9" width="44" height="42" rx="3" fill="#EAF3F8" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<rect x="14" y="13" width="36" height="34" fill="#BFDDE8"/>
<path d="M32 13v34M14 30h36" stroke="{WHITE}" stroke-width="3.4"/>
<rect x="10" y="9" width="44" height="42" rx="3" fill="none" stroke="{WOOD}" stroke-width="4"/>
<rect x="7" y="51" width="50" height="5" rx="2" fill="{WOOD}"/>
<path d="M17 17l6-4M17 26l10-7" stroke="#FFFFFF" stroke-width="2" opacity=".55" stroke-linecap="round"/>
'''

ICONS['mirror'] = f'''
<ellipse cx="32" cy="28" rx="17" ry="20" fill="{WOOD}"/>
<ellipse cx="32" cy="28" rx="13" ry="16" fill="#D6E7F0"/>
<path d="M24 20c-2 4-3 9-2 13" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"/>
<path d="M26 47h12l4 8H22z" fill="{WOOD_D}"/>
<rect x="20" y="55" width="24" height="4" rx="2" fill="{WOOD_D}"/>
'''

ICONS['bookshelf'] = f'''
<rect x="12" y="10" width="40" height="46" rx="2" fill="{WOOD}" stroke="{INK}" stroke-opacity=".12" stroke-width="2"/>
<rect x="17" y="15" width="4" height="13" fill="{CORAL}"/>
<rect x="22" y="13" width="4" height="15" fill="{BLUE}"/>
<rect x="27" y="16" width="4" height="12" fill="{GREEN}"/>
<rect x="33" y="14" width="5" height="14" fill="{ORANGE}"/>
<rect x="16" y="31" width="32" height="2.5" fill="{WOOD_D}"/>
<rect x="16" y="46" width="32" height="2.5" fill="{WOOD_D}"/>
<rect x="18" y="36" width="5" height="10" fill="#9C6BB0"/>
<rect x="24" y="34" width="4" height="12" fill="{CORAL}"/>
<rect x="29" y="37" width="5" height="9" fill="{BLUE}"/>
<rect x="36" y="35" width="4" height="11" fill="{GREEN}"/>
<rect x="17" y="51" width="30" height="2.5" fill="{WOOD_D}"/>
'''

ICONS['refrigerator'] = f'''
<rect x="15" y="8" width="34" height="48" rx="6" fill="{WHITE}" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<rect x="15" y="27" width="34" height="2.5" fill="{INK}" opacity=".18"/>
<rect x="20" y="14" width="3" height="8" rx="1.5" fill="{STEEL_D}"/>
<rect x="20" y="32" width="3" height="11" rx="1.5" fill="{STEEL_D}"/>
<rect x="26" y="18" width="10" height="4" rx="2" fill="{ORANGE}" opacity=".5"/>
<rect x="26" y="37" width="10" height="4" rx="2" fill="{BLUE}" opacity=".4"/>
'''

ICONS['air-conditioner'] = f'''
<rect x="9" y="14" width="46" height="20" rx="6" fill="{WHITE}" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<rect x="13" y="26" width="38" height="5" rx="2.5" fill="{STEEL}" opacity=".7"/>
<path d="M17 39c2 4 2 8 0 12M27 39c2 4 2 8 0 12M37 39c2 4 2 8 0 12M47 39c2 4 2 8 0 12" stroke="{BLUE}" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".85"/>
<circle cx="46" cy="20" r="2.2" fill="{GREEN}"/>
'''

ICONS['electric-fan'] = f'''
<circle cx="32" cy="26" r="19" fill="#EFF4F7" stroke="{STEEL_D}" stroke-width="2.5"/>
<g fill="{BLUE}">
<path d="M32 26c3-8 10-14 14-11 4 3 1 12-6 16-3 2-6 2-8 1z"/>
<path d="M32 26c-8 3-16 0-15-5 1-5 10-7 16-2 2 2 3 5 3 7z"/>
<path d="M32 26c2 8-2 16-7 14-5-2-5-11 1-16 2-2 4-3 6-3z"/>
</g>
<circle cx="32" cy="26" r="4.2" fill="{STEEL}" stroke="{STEEL_D}" stroke-width="1.6"/>
<path d="M32 45v7" stroke="{STEEL_D}" stroke-width="4" stroke-linecap="round"/>
<ellipse cx="32" cy="55" rx="14" ry="4.5" fill="{GREY}"/>
<g stroke="{STEEL_D}" stroke-width="1.6" fill="none" opacity=".5">
<circle cx="32" cy="26" r="15"/>
</g>
'''

ICONS['power-strip'] = f'''
<path d="M4 36c0-4 4-6 8-6" stroke="{STEEL_D}" stroke-width="3" fill="none" stroke-linecap="round"/>
<rect x="8" y="24" width="48" height="17" rx="5" fill="{WHITE}" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<g fill="#8A959E">
<rect x="13" y="28" width="9" height="9" rx="2"/>
<rect x="26" y="28" width="9" height="9" rx="2"/>
<rect x="39" y="28" width="9" height="9" rx="2"/>
</g>
<g fill="{WHITE}">
<circle cx="17.5" cy="31" r="1"/><circle cx="17.5" cy="34" r="1"/>
<circle cx="30.5" cy="31" r="1"/><circle cx="30.5" cy="34" r="1"/>
<circle cx="43.5" cy="31" r="1"/><circle cx="43.5" cy="34" r="1"/>
</g>
<rect x="49" y="29" width="6" height="7" rx="2" fill="{CORAL}"/>
'''

ICONS['wardrobe'] = f'''
<rect x="13" y="9" width="38" height="47" rx="3" fill="{WOOD}" stroke="{INK}" stroke-opacity=".14" stroke-width="2"/>
<rect x="17" y="14" width="13" height="38" rx="2" fill="{WOOD_D}" opacity=".35"/>
<rect x="34" y="14" width="13" height="38" rx="2" fill="{WOOD_D}" opacity=".35"/>
<path d="M13 9h38l-3-4H16z" fill="{WOOD_D}"/>
<circle cx="28" cy="32" r="2.2" fill="{INK}" opacity=".65"/>
<circle cx="36" cy="32" r="2.2" fill="{INK}" opacity=".65"/>
<rect x="15" y="56" width="5" height="4" rx="1.5" fill="{WOOD_D}"/>
<rect x="44" y="56" width="5" height="4" rx="1.5" fill="{WOOD_D}"/>
'''

ICONS['drawer'] = f'''
<rect x="11" y="13" width="42" height="40" rx="4" fill="{WOOD}"/>
<g>
<rect x="15" y="17" width="34" height="10" rx="2" fill="{WOOD_D}" opacity=".35"/>
<rect x="15" y="30" width="34" height="10" rx="2" fill="{WOOD_D}" opacity=".35"/>
<rect x="15" y="43" width="34" height="6" rx="2" fill="{WOOD_D}" opacity=".35"/>
</g>
<rect x="25" y="20.5" width="14" height="3" rx="1.5" fill="{INK}" opacity=".5"/>
<rect x="25" y="33.5" width="14" height="3" rx="1.5" fill="{INK}" opacity=".5"/>
<rect x="25" y="44.5" width="14" height="3" rx="1.5" fill="{INK}" opacity=".5"/>
<path d="M11 13h42" stroke="#F0C99C" stroke-opacity=".7" stroke-width="2"/>
'''

ICONS['stool'] = f'''
<ellipse cx="32" cy="22" rx="18" ry="7" fill="{WOOD}"/>
<ellipse cx="32" cy="20.5" rx="18" ry="6.5" fill="#E8BE8C"/>
<path d="M16 24l-4 30M48 24l4 30M32 27v27" stroke="{WOOD_D}" stroke-width="4.5" stroke-linecap="round"/>
<path d="M20 44h24" stroke="{WOOD_D}" stroke-width="3" stroke-linecap="round" opacity=".8"/>
'''

ICONS['curtain'] = f'''
<rect x="8" y="11" width="48" height="3.5" rx="1.75" fill="{WOOD_D}"/>
<circle cx="8" cy="12.7" r="3" fill="{ORANGE}"/>
<circle cx="56" cy="12.7" r="3" fill="{ORANGE}"/>
<path d="M12 15c0 14 4 26 0 37h14c-3-13-3-25 0-37z" fill="{CORAL}" opacity=".8"/>
<path d="M52 15c0 14-4 26 0 37H38c3-13 3-25 0-37z" fill="{CORAL}" opacity=".8"/>
<path d="M17 18c-2 12-2 22 0 30M23 18c-1 12-1 22 0 30" stroke="#D8614F" stroke-width="1.6" fill="none" opacity=".7"/>
<path d="M47 18c2 12 2 22 0 30M41 18c1 12 1 22 0 30" stroke="#D8614F" stroke-width="1.6" fill="none" opacity=".7"/>
<rect x="26" y="16" width="12" height="36" fill="{BLUE}" opacity=".18"/>
'''

ICONS['carpet'] = f'''
<path d="M10 22l22-8 22 8-4 26-18 7-18-7z" fill="#C97F86"/>
<path d="M15 24l17-6 17 6-3 21-14 5.5L18 45z" fill="#DE96A0"/>
<path d="M22 27l10-3 10 3-2 15-8 3-8-3z" fill="#F3C7CE" opacity=".85"/>
<g stroke="#E7B37C" stroke-width="2" stroke-linecap="round">
<path d="M10 22l-3 3M14 20l-3 3M54 22l3 3M50 20l3 3"/>
</g>
'''

ICONS['blanket'] = f'''
<rect x="10" y="26" width="44" height="10" rx="4" fill="#9FBFD8"/>
<rect x="10" y="36" width="44" height="10" rx="4" fill="#7FA8C9"/>
<rect x="10" y="46" width="44" height="9" rx="4" fill="#9FBFD8"/>
<path d="M10 31h44M10 41h44M10 50h44" stroke="#F1F6FA" stroke-width="1.8" opacity=".8"/>
<rect x="10" y="26" width="12" height="29" rx="4" fill="#B9D2E4" opacity=".55"/>
'''

ICONS['washing-machine'] = f'''
<rect x="11" y="9" width="42" height="46" rx="6" fill="{WHITE}" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<rect x="15" y="13" width="34" height="9" rx="3" fill="#EDF1F3"/>
<circle cx="20" cy="17.5" r="3" fill="{STEEL_D}"/>
<rect x="27" y="15.5" width="16" height="4" rx="2" fill="#B7D9C6"/>
<circle cx="32" cy="37" r="13" fill="{STEEL}"/>
<circle cx="32" cy="37" r="12" fill="{STEEL_D}" opacity=".35"/>
<circle cx="32" cy="37" r="10" fill="#BFDDE8"/>
<path d="M25 40c4-8 10-8 14 0-4 4-10 4-14 0z" fill="{BLUE}" opacity=".55"/>
<circle cx="32" cy="37" r="13" fill="none" stroke="{INK}" stroke-opacity=".1" stroke-width="2"/>
'''

ICONS['heater'] = f'''
<rect x="12" y="24" width="40" height="20" rx="3" fill="{STEEL}"/>
<g stroke="{STEEL_D}" stroke-width="3">
<path d="M19 27v14M26 27v14M33 27v14M40 27v14M47 27v14"/>
</g>
<rect x="12" y="24" width="40" height="4" rx="2" fill="#DCE3E8"/>
<rect x="16" y="44" width="4" height="8" rx="2" fill="{STEEL_D}"/>
<rect x="44" y="44" width="4" height="8" rx="2" fill="{STEEL_D}"/>
<path d="M20 18c-3-3-3-6 0-9M32 18c-3-3-3-6 0-9M44 18c-3-3-3-6 0-9" stroke="{CORAL}" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".85"/>
'''

ICONS['air-fryer'] = f'''
<rect x="14" y="14" width="36" height="40" rx="9" fill="#4E5762"/>
<rect x="19" y="20" width="26" height="15" rx="4" fill="#7E8A93"/>
<path d="M19 34h26" stroke="{INK}" stroke-opacity=".25" stroke-width="2"/>
<rect x="22" y="38" width="20" height="5" rx="2.5" fill="{ORANGE}"/>
<path d="M41 22h6v22" stroke="{GREY}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<rect x="24" y="8" width="16" height="6" rx="3" fill="{GREY}"/>
<circle cx="46" cy="48" r="2.2" fill="{GREEN}"/>
'''

ICONS['oven'] = f'''
<rect x="11" y="12" width="42" height="42" rx="5" fill="{STEEL}"/>
<rect x="15" y="17" width="34" height="7" rx="2.5" fill="#8A959E"/>
<circle cx="20" cy="20.5" r="2.2" fill="{CREAM}"/>
<circle cx="28" cy="20.5" r="2.2" fill="{CREAM}"/>
<circle cx="36" cy="20.5" r="2.2" fill="{ORANGE}"/>
<rect x="15" y="28" width="34" height="22" rx="3" fill="#3F4852"/>
<rect x="19" y="32" width="26" height="14" rx="2" fill="#8FB3C9" opacity=".65"/>
<path d="M15 28h34" stroke="{GREY}" stroke-width="3" stroke-linecap="round"/>
<path d="M24 39h16M32 33v12" stroke="#E9F1F6" stroke-width="1.6" opacity=".5"/>
'''

ICONS['gas-stove'] = f'''
<rect x="7" y="18" width="50" height="34" rx="6" fill="#4E5762"/>
<rect x="7" y="18" width="50" height="5" rx="2.5" fill="#6C7681"/>
<g stroke="#2F3740" stroke-width="3" fill="none" stroke-linecap="round">
<circle cx="22" cy="31" r="7.5"/><path d="M22 23.5v15M14.5 31h15"/>
<circle cx="42" cy="31" r="7.5"/><path d="M42 23.5v15M34.5 31h15"/>
</g>
<g fill="{ORANGE}">
<circle cx="22" cy="31" r="2.2"/><circle cx="42" cy="31" r="2.2"/>
</g>
<rect x="17" y="43" width="7" height="4" rx="2" fill="{STEEL}"/>
<rect x="29" y="43" width="7" height="4" rx="2" fill="{STEEL}"/>
<rect x="41" y="43" width="7" height="4" rx="2" fill="{STEEL}"/>
'''

ICONS['range-hood'] = f'''
<path d="M22 10h20v10l14 12v6H8v-6l14-12z" fill="{STEEL}"/>
<path d="M22 10h20v10l14 12H8l14-12z" fill="#DCE3E8"/>
<rect x="10" y="38" width="44" height="5" rx="2.5" fill="{STEEL_D}"/>
<path d="M22 47c0 4-2 6-2 9M32 47c0 4-2 6-2 9M42 47c0 4-2 6-2 9" stroke="{BLUE}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8"/>
'''

ICONS['kettle'] = f'''
<path d="M20 24h24l-3 22H23z" fill="{CORAL}"/>
<path d="M20 24c0-6 5-10 12-10s12 4 12 10z" fill="#F0917F"/>
<path d="M44 28c8 2 11 8 9 14-2 5-7 6-8 3" fill="none" stroke="{CORAL}" stroke-width="6" stroke-linecap="round"/>
<path d="M20 30c-6 2-9 6-10 10l6 3c1-4 3-7 6-9z" fill="{CORAL}"/>
<rect x="29" y="9" width="6" height="5" rx="2.5" fill="{WOOD_D}"/>
<path d="M25 34h14" stroke="#FFFFFF" stroke-opacity=".45" stroke-width="2.4" stroke-linecap="round"/>
'''

ICONS['toaster'] = f'''
<rect x="10" y="26" width="44" height="26" rx="6" fill="{STEEL}"/>
<path d="M18 26V14h7v12M39 26V14h7v12" fill="#E8C79A"/>
<rect x="18" y="26" width="7" height="4" fill="#C79A6B"/>
<rect x="39" y="26" width="7" height="4" fill="#C79A6B"/>
<rect x="14" y="34" width="8" height="3" rx="1.5" fill="{STEEL_D}"/>
<circle cx="46" cy="36" r="3" fill="{ORANGE}"/>
<path d="M10 46h44" stroke="{STEEL_D}" stroke-width="2"/>
'''

ICONS['blender'] = f'''
<path d="M22 8h20l-2 26H24z" fill="#DDEBF2" stroke="{INK}" stroke-opacity=".12" stroke-width="2"/>
<rect x="20" y="6" width="24" height="4" rx="2" fill="{STEEL_D}"/>
<path d="M27 20l10-4-10 8 10-4" stroke="{CORAL}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<rect x="18" y="34" width="28" height="8" rx="3" fill="{STEEL_D}"/>
<path d="M22 42h20l-3 14H25z" fill="#4E5762"/>
<circle cx="32" cy="50" r="3.4" fill="{ORANGE}"/>
'''

ICONS['napkin'] = f'''
<rect x="21" y="13" width="22" height="38" rx="11" fill="#F8F4EA" stroke="{INK}" stroke-opacity=".14" stroke-width="2"/>
<ellipse cx="32" cy="14" rx="11" ry="4.2" fill="{WHITE}"/>
<path d="M24 18c-2 8-2 20 0 28M32 16v30M40 18c2 8 2 20 0 28" stroke="{STEEL}" stroke-width="1.6" fill="none" opacity=".6"/>
<rect x="18" y="30" width="28" height="6" rx="3" fill="#D4A017"/>
<ellipse cx="32" cy="52" rx="13" ry="4" fill="#E7E0D2"/>
'''

ICONS['kitchen-scale'] = f'''
<rect x="11" y="34" width="42" height="16" rx="5" fill="{STEEL}"/>
<rect x="16" y="27" width="32" height="7" rx="3" fill="#DCE3E8"/>
<circle cx="32" cy="42" r="6.5" fill="{WHITE}" stroke="{STEEL_D}" stroke-width="2"/>
<path d="M32 42l3.5-4" stroke="{CORAL}" stroke-width="2.2" stroke-linecap="round"/>
<path d="M22 27c0-6 4-10 10-10s10 4 10 10z" fill="{ORANGE}"/>
<path d="M24 22h16" stroke="#FFFFFF" stroke-opacity=".45" stroke-width="2" stroke-linecap="round"/>
'''

ICONS['pterodactyl'] = f'''
<path d="M30 30c6-12 15-17 26-14-5 6-11 9-17 10 9 2 15 8 17 16-8-4-16-4-22-1-3 2-5 5-6 9l-6-16c-2-6 1-12 8-14z" fill="#C98F5E"/>
<path d="M8 25l19 4-1 5z" fill="#B8763E"/>
<path d="M29 25l6-11 4 10z" fill="#D9A875"/>
<circle cx="27" cy="27" r="1.7" fill="{INK}" opacity=".7"/>
<path d="M33 27c4-4 8-6 13-6" stroke="#B8763E" stroke-width="2" fill="none" opacity=".55"/>
<path d="M33 32l8 8M38 29l6 10" stroke="#B8763E" stroke-width="1.6" opacity=".45"/>
'''

ICONS['triceratops'] = f'''
<path d="M8 40c-2-7 3-12 10-12h12c2-6 8-9 14-8l6 3-1 6-6 3-1 8-6 6H16c-4 0-7-2-8-6z" fill="#8FA85E"/>
<path d="M34 26c6-6 14-6 18 0 3 5 1 12-4 14l-8-2-6-6z" fill="#9CB86A"/>
<path d="M50 24l8-6-3 9z" fill="#E8DCC6"/>
<path d="M36 22l-2-8 6 5z" fill="#E8DCC6"/>
<path d="M46 35l8 2-8 3z" fill="#E8DCC6"/>
<circle cx="47" cy="28" r="1.8" fill="{INK}" opacity=".7"/>
<rect x="16" y="44" width="5" height="10" rx="2.5" fill="#7A9350"/>
<rect x="27" y="45" width="5" height="9" rx="2.5" fill="#7A9350"/>
<rect x="38" y="44" width="5" height="10" rx="2.5" fill="#7A9350"/>
<path d="M8 38l-6-4 6-2z" fill="#7A9350"/>
'''

ICONS['stegosaurus'] = f'''
<path d="M10 42c0-6 4-10 11-10h16c4 0 7 2 9 5l4-6 3 7-2 8-8 4H20c-6 0-10-3-10-8z" fill="#7FA07A"/>
<path d="M20 32l4-8 4 8M28 30l4-9 4 9M36 30l4-8 3 8" fill="#EF8B6B"/>
<path d="M10 40l-6-6 2 8z" fill="#7FA07A"/>
<circle cx="46" cy="30" r="5" fill="#8FB48A"/>
<circle cx="48" cy="29" r="1.4" fill="{INK}" opacity=".7"/>
<rect x="18" y="46" width="5" height="9" rx="2.5" fill="#6C8C67"/>
<rect x="31" y="46" width="5" height="9" rx="2.5" fill="#6C8C67"/>
<rect x="41" y="45" width="5" height="10" rx="2.5" fill="#6C8C67"/>
'''

ICONS['ankylosaurus'] = f'''
<path d="M14 44c-6-2-9-8-6-14 3-5 10-7 16-6l18 3c6 1 10 5 10 10 0 6-5 9-11 9H20z" fill="#A8906B"/>
<path d="M12 36l-8 6 9 1-6 5 9-1" fill="#BFA57C"/>
<circle cx="46" cy="30" r="6" fill="#BFA57C"/>
<circle cx="49" cy="29" r="1.4" fill="{INK}" opacity=".7"/>
<path d="M22 26l2-6 3 5M30 25l2-6 3 5M38 26l2-6 3 5M46 27l2-5 2 5" fill="#EF8B6B"/>
<rect x="20" y="46" width="5" height="8" rx="2.5" fill="#8F7A58"/>
<rect x="33" y="46" width="5" height="8" rx="2.5" fill="#8F7A58"/>
'''

ICONS['mosasaurus'] = f'''
<path d="M6 34c8-10 20-12 28-8 6 3 10 3 14 1 4-2 8 0 8 4s-4 6-8 6c-4 0-7 2-11 5-6 4-16 5-24 1-6-3-9-6-7-9z" fill="#5AA9B5"/>
<path d="M50 30l6-4 2 5-6 3z" fill="#4E97A3"/>
<circle cx="46" cy="31" r="1.6" fill="{INK}" opacity=".75"/>
<path d="M22 42c-3 5-2 9 1 11M36 44c-2 5-1 8 2 10" stroke="#4E97A3" stroke-width="6" stroke-linecap="round" fill="none"/>
<path d="M6 34c-4 2-4 6 0 8" stroke="#4E97A3" stroke-width="2.4" fill="none"/>
'''

ICONS['amber'] = f'''
<path d="M32 10c9 0 16 8 16 18 0 12-8 24-16 26-8-2-16-14-16-26 0-10 7-18 16-18z" fill="#E8A93C"/>
<path d="M24 18c-4 6-5 14-3 22" stroke="#F8D488" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>
<path d="M36 22c3 0 6 2 6 5s-3 6-6 6-6-3-6-6 3-5 6-5z" fill="#B4701C" opacity=".55"/>
<path d="M40 30l6 6M38 36l6 4" stroke="#B4701C" stroke-width="1.8" opacity=".55"/>
'''

ICONS['jellyfish'] = f'''
<path d="M14 34c0-12 8-20 18-20s18 8 18 20z" fill="#D98BB0"/>
<path d="M14 34c4 0 6-2 9 0 3 2 6-2 9 0 3 2 6-2 9 0 3 2 5 0 9 0z" fill="#C77A9E"/>
<g stroke="#D98BB0" stroke-width="2.6" fill="none" stroke-linecap="round">
<path d="M20 35c-2 6 2 8 0 14s2 6 0 10"/>
<path d="M27 35c-2 7 2 9 0 15s2 5 0 8"/>
<path d="M34 35c-1 7 2 9 0 15s2 6 0 9"/>
<path d="M41 35c-2 6 2 8 0 14s2 5 0 8"/>
</g>
<circle cx="26" cy="24" r="2.6" fill="#FFFFFF" opacity=".55"/>
'''

ICONS['starfish'] = f'''
<path d="M32 9l6.4 14.6L54 14l-7 15.3L59 38l-16 1.6 2.4 15.4L32 44l-13.4 11 2.4-15.4L5 38l12-8.7L10 14l15.6 9.6z" fill="#EF8B6B" transform="scale(.88) translate(4.4 2.6)"/>
<circle cx="32" cy="31" r="2.4" fill="#FBD3C4"/>
<g fill="#D9704F" opacity=".55">
<circle cx="24" cy="24" r="1.5"/><circle cx="40" cy="24" r="1.5"/><circle cx="21" cy="36" r="1.5"/>
<circle cx="43" cy="36" r="1.5"/><circle cx="32" cy="40" r="1.5"/><circle cx="31" cy="18" r="1.5"/>
</g>
'''

ICONS['seahorse'] = f'''
<path d="M40 12c-8-4-16 0-17 8-1 6 3 9 3 14 0 4-3 6-3 11 0 5 4 9 9 9 4 0 7-3 7-7 0-3-2-5-4-5-2 0-3 1-3 3" fill="none" stroke="#D9A03F" stroke-width="7" stroke-linecap="round"/>
<path d="M40 12c4 0 7 2 8 5l-6 3z" fill="#D9A03F"/>
<path d="M26 24c-4-2-6-6-5-10 3 1 5 4 6 8z" fill="#E8B85C"/>
<circle cx="41" cy="18" r="1.8" fill="{INK}" opacity=".7"/>
<path d="M44 20l4 2" stroke="{INK}" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round"/>
<g stroke="#C08B2E" stroke-width="1.6" opacity=".6">
<path d="M30 34l4 2M28 40l4 2M30 46l4 2"/>
</g>
'''

ICONS['coral'] = f'''
<path d="M32 56V36" stroke="#E2735A" stroke-width="7" stroke-linecap="round"/>
<path d="M32 40l-10-8M32 44l10-7" stroke="#E2735A" stroke-width="7" stroke-linecap="round"/>
<path d="M22 32c-3-6-2-12 2-16M42 37c4-4 6-9 5-14M22 32c-5 1-8 4-8 8M42 37c5 2 7 5 7 9" stroke="#EF8B6B" stroke-width="5.5" stroke-linecap="round" fill="none"/>
<g fill="#F7B2A0">
<circle cx="24" cy="16" r="3"/><circle cx="47" cy="23" r="3"/><circle cx="14" cy="40" r="2.6"/><circle cx="49" cy="46" r="2.6"/>
</g>
'''

ICONS['bow'] = f'''
<path d="M22 8c-9 10-9 38 0 48" stroke="{WOOD}" stroke-width="5.5" fill="none" stroke-linecap="round"/>
<path d="M22 8c-5 4-5 10 0 14M22 42c-5 4-5 10 0 14" stroke="{WOOD_D}" stroke-width="2" fill="none" opacity=".7"/>
<path d="M22 8v48" stroke="#E7E3DA" stroke-width="1.8"/>
<path d="M8 32h44" stroke="{WOOD_D}" stroke-width="3" stroke-linecap="round"/>
<path d="M52 32l-8-4v8z" fill="{STEEL_D}"/>
<path d="M8 32l7-4v8z" fill="{CORAL}"/>
<path d="M12 28v8M16 28v8" stroke="{CORAL}" stroke-width="2" opacity=".8"/>
'''

ICONS['grenade'] = f'''
<circle cx="32" cy="38" r="16" fill="#5E6B4F"/>
<g fill="#4B5740" opacity=".7">
<path d="M18 32h28v3H18zM20 40h24v3H20z"/>
</g>
<path d="M23 24h18v4H23z" fill="#6E7C5C"/>
<rect x="29" y="16" width="7" height="9" rx="2" fill="#8A9790"/>
<path d="M36 18c4 0 6 2 6 5" stroke="#8A9790" stroke-width="3" fill="none" stroke-linecap="round"/>
<circle cx="42" cy="23" r="3" fill="#B0BAB4"/>
<path d="M43 15c3-1 5 1 5 3" stroke="#B0BAB4" stroke-width="2.2" fill="none" stroke-linecap="round"/>
'''

ICONS['submarine'] = f'''
<ellipse cx="30" cy="38" rx="21" ry="11" fill="#F2C14E"/>
<ellipse cx="30" cy="38" rx="21" ry="11" fill="none" stroke="#C99A2E" stroke-width="2"/>
<rect x="24" y="20" width="14" height="12" rx="4" fill="#E8B83C"/>
<rect x="28" y="12" width="3" height="9" fill="#B0BAB4"/>
<rect x="26" y="9" width="7" height="4" rx="2" fill="#B0BAB4"/>
<circle cx="27" cy="45" r="2.4" fill="#7FC4E8"/>
<circle cx="34" cy="45" r="2.4" fill="#7FC4E8"/>
<path d="M51 34c3 2 3 6 0 8z" fill="#C9A94E"/>
<path d="M9 38h-4M9 33h-4M9 43h-4" stroke="#7FC4E8" stroke-width="2" stroke-linecap="round" opacity=".7"/>
'''

ICONS['cannon'] = f'''
<path d="M14 26h30v12H14z" fill="#4E5762"/>
<rect x="42" y="28" width="12" height="8" rx="2" fill="#3A4149"/>
<rect x="10" y="24" width="6" height="16" rx="2" fill="#5E6B76"/>
<circle cx="24" cy="44" r="9" fill="{WOOD}" stroke="{WOOD_D}" stroke-width="2"/>
<path d="M24 35v18M15 44h18" stroke="{WOOD_D}" stroke-width="2" opacity=".7"/>
<circle cx="24" cy="44" r="2.6" fill="{WOOD_D}"/>
<path d="M54 30c4 0 6 2 6 4s-2 4-6 4z" fill="{ORANGE}"/>
'''

ICONS['armor'] = f'''
<path d="M24 12c2-3 5-5 8-5s6 2 8 5l8 5-2 9-4-2v20c-3 3-6 4-10 4s-7-1-10-4V24l-4 2-2-9z" fill="#9AA7B2" stroke="{INK}" stroke-opacity=".14" stroke-width="2"/>
<path d="M24 12c2 3 5 5 8 5s6-2 8-5" fill="#C3CCD3"/>
<path d="M32 18v30" stroke="#7E8A93" stroke-width="2" opacity=".8"/>
<g fill="#C3CCD3">
<circle cx="26" cy="28" r="1.8"/><circle cx="38" cy="28" r="1.8"/><circle cx="26" cy="37" r="1.8"/><circle cx="38" cy="37" r="1.8"/>
</g>
<path d="M22 22c-2 4-2 8 0 12M42 22c2 4 2 8 0 12" stroke="#7E8A93" stroke-width="1.8" fill="none" opacity=".7"/>
'''

ICONS['skirt'] = f'''
<path d="M25 12h14l2 10 11 30a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2l11-30z" fill="{CORAL}"/>
<path d="M25 12h14v10H25z" fill="#D8614F"/>
<path d="M32 22v30M24 24l-6 28M40 24l6 28" stroke="#C95745" stroke-width="1.8" opacity=".75"/>
<rect x="24" y="10" width="16" height="4" rx="2" fill="#8E9BB3"/>
'''

ICONS['pajamas'] = f'''
<path d="M24 12h16l8 8-5 6-4-4v14H25V22l-4 4-5-6z" fill="#8FA7C9"/>
<path d="M25 34h14v8H25z" fill="#7C93B5"/>
<path d="M25 40h6v14h-6zM33 40h6v14h-6z" fill="#8FA7C9"/>
<g fill="#DDE6F2">
<circle cx="28" cy="18" r="1.8"/><circle cx="38" cy="24" r="1.8"/><circle cx="27" cy="28" r="1.8"/><circle cx="38" cy="44" r="1.8"/>
</g>
<path d="M30 12l2 5 2-5" fill="none" stroke="#7189AB" stroke-width="2"/>
'''

ICONS['sweater'] = f'''
<path d="M24 14h16l9 7-7 9-3-3v24H25V27l-3 3-7-9z" fill="#D98B5E"/>
<path d="M24 14c2 4 5 6 8 6s6-2 8-6" fill="none" stroke="#B8703F" stroke-width="3"/>
<path d="M25 45h14" stroke="#B8703F" stroke-width="3"/>
<g stroke="#C4784B" stroke-width="1.6" opacity=".8">
<path d="M28 28v16M32 28v16M36 28v16"/>
</g>
'''

ICONS['belt'] = f'''
<path d="M6 27h52v10H6z" fill="#7A5236"/>
<path d="M6 30h52v2H6z" fill="#5C3C26" opacity=".6"/>
<rect x="22" y="22" width="18" height="20" rx="3" fill="none" stroke="#C9A227" stroke-width="4"/>
<path d="M31 22v20" stroke="#C9A227" stroke-width="3"/>
<circle cx="31" cy="32" r="1.6" fill="#7A5236"/>
<g fill="#C9A227">
<circle cx="10" cy="32" r="1.4"/><circle cx="16" cy="32" r="1.4"/><circle cx="48" cy="32" r="1.4"/><circle cx="54" cy="32" r="1.4"/>
</g>
'''

ICONS['zipper'] = f'''
<rect x="20" y="8" width="24" height="48" rx="3" fill="#5C6670"/>
<path d="M32 8v48" stroke="#3F4852" stroke-width="2"/>
<g fill="#C3CCD3">
<path d="M24 12h6v4h-6zM34 12h6v4h-6zM24 21h6v4h-6zM34 21h6v4h-6zM24 30h6v4h-6zM34 30h6v4h-6zM24 48h6v4h-6zM34 48h6v4h-6z"/>
</g>
<path d="M26 37h12l-2 8h-8z" fill="#F2C14E" stroke="#C99A2E" stroke-width="1.6"/>
<circle cx="32" cy="41" r="2" fill="#3F4852"/>
'''

ICONS['button'] = f'''
<circle cx="32" cy="32" r="18" fill="#E8A24D"/>
<circle cx="32" cy="32" r="13" fill="none" stroke="#C9812F" stroke-width="2" opacity=".7"/>
<g fill="#5C3C26">
<circle cx="27" cy="27" r="2.4"/><circle cx="37" cy="27" r="2.4"/><circle cx="27" cy="37" r="2.4"/><circle cx="37" cy="37" r="2.4"/>
</g>
<path d="M27 27l10 10M37 27L27 37" stroke="#C9812F" stroke-width="1.6" opacity=".8"/>
<circle cx="32" cy="32" r="18" fill="none" stroke="#C9812F" stroke-width="2"/>
'''

ICONS['collar'] = f'''
<path d="M15 11h34v9l-9 7v28H24V27l-9-7z" fill="#DCE9F5" stroke="{INK}" stroke-opacity=".14" stroke-width="2"/>
<path d="M24 27l8 8 8-8 4 4-8 10-8 10-8-10-8-10z" fill="{WHITE}" stroke="{INK}" stroke-opacity=".14" stroke-width="2"/>
<path d="M32 45v12" stroke="#B7CBDD" stroke-width="2"/>
<circle cx="32" cy="49" r="1.8" fill="{STEEL_D}"/>
<circle cx="32" cy="54" r="1.8" fill="{STEEL_D}"/>
'''

def body(highlight, color='#F08A2E'):
    return f'''
<g fill="#D5DEE5" stroke="{INK}" stroke-opacity=".18" stroke-width="1.6" stroke-linejoin="round">
<circle cx="32" cy="9" r="8"/>
<rect x="29" y="15.5" width="6" height="5" rx="2"/>
<path d="M20 24a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v14a3 3 0 0 1-3 3H23a3 3 0 0 1-3-3z"/>
<rect x="14.5" y="22" width="5" height="20" rx="2.5"/>
<rect x="44.5" y="22" width="5" height="20" rx="2.5"/>
<rect x="22" y="40" width="20" height="7" rx="3"/>
<rect x="24.5" y="46" width="6" height="13" rx="3"/>
<rect x="33.5" y="46" width="6" height="13" rx="3"/>
</g>
<g fill="{color}" opacity=".95">{highlight}</g>
'''

ICONS['head'] = body('<circle cx="32" cy="9" r="8"/>')
ICONS['hair'] = body('<path d="M23 11c0-7 4-10 9-10s9 3 9 10c-1-4-4-6-9-6s-8 2-9 6z"/>', '#6B4A2F')
ICONS['forehead'] = body('<path d="M24 9a8 8 0 0 1 16 0z"/>')
ICONS['neck'] = body('<rect x="29" y="15" width="6" height="6" rx="2"/>')
ICONS['shoulder'] = body('<path d="M20 24a4 4 0 0 1 4-4h7v7h-11z"/>')
ICONS['chest'] = body('<path d="M22 21h20v9H22z"/>')
ICONS['stomach'] = body('<path d="M21 30.5h22v7H21z"/>')
ICONS['waist'] = body('<path d="M21 37.5h22v4H21z"/>')
ICONS['arm'] = body('<rect x="14.5" y="22" width="5" height="20" rx="2.5"/>')
ICONS['elbow'] = body('<circle cx="17" cy="33" r="4"/>')
ICONS['wrist'] = body('<rect x="14.5" y="37.5" width="5" height="4.5" rx="2.2"/>')
ICONS['knee'] = body('<rect x="24.5" y="53" width="6" height="5" rx="2.5"/>')

ICONS['pill'] = f'''
<g transform="rotate(-40 32 32)">
<rect x="14" y="24" width="36" height="16" rx="8" fill="{WHITE}" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<path d="M32 24h10a8 8 0 0 1 0 16H32z" fill="{CORAL}"/>
<path d="M24 28h6M24 32h4" stroke="#C3CCD3" stroke-width="2" stroke-linecap="round"/>
</g>
'''

ICONS['stairs'] = f'''
<path d="M8 56V44h12V32h12V20h12V8h12v48z" fill="#D9CDBB"/>
<path d="M8 44h12M20 32h12M32 20h12M44 8h12" stroke="#B7A890" stroke-width="2"/>
<path d="M8 56V44h12V32h12V20h12V8h12" stroke="{INK}" stroke-opacity=".18" stroke-width="2" fill="none"/>
<path d="M14 48l4-3M26 36l4-3M38 24l4-3" stroke="#F6A94D" stroke-width="2" opacity=".7" stroke-linecap="round"/>
'''

ICONS['basement'] = f'''
<path d="M32 6l24 16v10H8V22z" fill="#D9CDBB"/>
<rect x="14" y="32" width="36" height="8" fill="#B7A890"/>
<rect x="14" y="40" width="36" height="18" fill="#8A93A8"/>
<rect x="20" y="46" width="12" height="8" rx="1.5" fill="#F2C14E" opacity=".8"/>
<path d="M38 50h8M42 46v8" stroke="#DCE3E8" stroke-width="2"/>
<path d="M32 12v4M26 20v4M38 20v4" stroke="#F6A94D" stroke-width="2.4" stroke-linecap="round"/>
'''

ICONS['ceiling'] = f'''
<path d="M32 7L57 21 32 35 7 21z" fill="{ORANGE}"/>
<path d="M7 21l25 14v22L7 43z" fill="#E9E2D5"/>
<path d="M57 21L32 35v22l25-14z" fill="#DCD4C5"/>
<path d="M32 7L57 21 32 35 7 21z" fill="none" stroke="{INK}" stroke-opacity=".16" stroke-width="2" stroke-linejoin="round"/>
<path d="M7 21l25 14 25-14" fill="none" stroke="{INK}" stroke-opacity=".1" stroke-width="1.6"/>
<path d="M20 31v9M43 31v9" stroke="{INK}" stroke-opacity=".1" stroke-width="1.6"/>
'''

ICONS['floor'] = f'''
<path d="M8 24h48v32H8z" fill="#EDE6DA"/>
<path d="M8 42h48v14H8z" fill="{WOOD}"/>
<path d="M8 42h48M8 49h48" stroke="{WOOD_D}" stroke-width="2"/>
<path d="M20 42v7M34 42v7M46 42v7M14 49v7M28 49v7M42 49v7" stroke="{WOOD_D}" stroke-width="1.6" opacity=".7"/>
<path d="M8 24l24-10 24 10" fill="none" stroke="{INK}" stroke-opacity=".18" stroke-width="2"/>
<path d="M32 24v18" stroke="{INK}" stroke-opacity=".1" stroke-width="1.6"/>
'''

ICONS['drill'] = f'''
<path d="M10 24h24v12H10z" fill="#4E5762"/>
<path d="M10 24c0-5 4-8 9-8h9v8z" fill="#5E6B76"/>
<rect x="34" y="26" width="8" height="8" rx="2" fill="#B0BAB4"/>
<path d="M42 28h6v4h-6z" fill="#8A959E"/>
<path d="M48 29h8l-2 2 2 2h-8z" fill="#C3CCD3"/>
<path d="M18 36l-4 12h8l4-12z" fill="#5E6B76"/>
<rect x="20" y="20" width="6" height="4" rx="2" fill="#F2C14E"/>
'''

ICONS['pliers'] = f'''
<path d="M24 56c-2-8 0-14 4-18l6 6c-4 4-6 8-4 12z" fill="#4E5762"/>
<path d="M40 56c2-8 0-14-4-18l-6 6c4 4 6 8 4 12z" fill="#4E5762"/>
<path d="M28 38L18 16c-2-4 2-8 6-6l12 20z" fill="#7E8A93"/>
<path d="M36 38l10-22c2-4-2-8-6-6L28 30z" fill="#9AA7B2"/>
<circle cx="32" cy="36" r="4" fill="#4E5762"/>
'''

ICONS['tape'] = f'''
<circle cx="32" cy="34" r="19" fill="#E8DCC6"/>
<circle cx="32" cy="34" r="11" fill="{CREAM}"/>
<circle cx="32" cy="34" r="11" fill="none" stroke="#C7B99E" stroke-width="2"/>
<path d="M44 24c6 2 10 6 12 11l-8 3c-1-4-3-7-6-9z" fill="#E8DCC6"/>
<path d="M13 34a19 19 0 0 1 19-19" stroke="#F6A94D" stroke-width="3" fill="none" stroke-linecap="round"/>
'''

ICONS['switch'] = f'''
<rect x="18" y="10" width="28" height="44" rx="5" fill="{WHITE}" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<rect x="25" y="17" width="14" height="24" rx="4" fill="#DCE3E8"/>
<rect x="27" y="19" width="10" height="11" rx="3" fill="#8A959E"/>
<rect x="27" y="19" width="10" height="11" rx="3" fill="{ORANGE}" opacity=".85"/>
<circle cx="32" cy="46" r="2" fill="{STEEL_D}"/>
'''

ICONS['referee'] = f'''
<path d="M26 12h16v8a8 8 0 0 1-16 0z" fill="#C3CCD3"/>
<path d="M26 16h16v4H26z" fill="#9AA7B2"/>
<circle cx="44" cy="24" r="9" fill="#7E8A93"/>
<circle cx="47" cy="24" r="3" fill="#4E5762"/>
<path d="M34 22l4 4" stroke="#9AA7B2" stroke-width="4" stroke-linecap="round"/>
<path d="M18 40h28v12H18z" fill="{CORAL}"/>
<path d="M18 40h28v3H18z" fill="#D8614F"/>
<path d="M24 44h16M24 48h10" stroke="#FFFFFF" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/>
'''

ICONS['cash-register'] = f'''
<path d="M12 28h26v10H12z" fill="#5E6B76"/>
<rect x="14" y="22" width="22" height="7" rx="2" fill="#8A959E"/>
<rect x="16" y="24" width="18" height="4" rx="1.5" fill="#BFDDE8"/>
<path d="M10 38h44v12H10z" fill="#7E8A93"/>
<rect x="14" y="41" width="8" height="6" rx="1.5" fill="#DCE3E8"/>
<rect x="25" y="41" width="8" height="6" rx="1.5" fill="#DCE3E8"/>
<rect x="36" y="41" width="8" height="6" rx="1.5" fill="#DCE3E8"/>
<rect x="10" y="50" width="44" height="5" rx="2" fill="#4E5762"/>
<path d="M40 22h12v6H40z" fill="#F2C14E"/>
'''

ICONS['shelf'] = f'''
<rect x="8" y="12" width="48" height="4" rx="2" fill="{WOOD_D}"/>
<rect x="8" y="34" width="48" height="4" rx="2" fill="{WOOD_D}"/>
<rect x="8" y="54" width="48" height="4" rx="2" fill="{WOOD_D}"/>
<rect x="15" y="20" width="7" height="14" rx="2" fill="{CORAL}"/>
<rect x="24" y="18" width="7" height="16" rx="2" fill="{BLUE}"/>
<rect x="33" y="22" width="7" height="12" rx="2" fill="{GREEN}"/>
<rect x="17" y="42" width="9" height="12" rx="2" fill="{ORANGE}"/>
<rect x="29" y="44" width="7" height="10" rx="2" fill="#9C6BB0"/>
<rect x="39" y="40" width="8" height="14" rx="2" fill="#E8C79A"/>
'''

def write_all():
    os.makedirs(OUT, exist_ok=True)
    svg_open = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">'
    for name, inner in ICONS.items():
        path = os.path.join(OUT, name + '.svg')
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(svg_open + inner.strip() + '</svg>\n')
    print('wrote', len(ICONS), 'icons to', OUT)


if __name__ == '__main__':
    write_all()