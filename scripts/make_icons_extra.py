# -*- coding: utf-8 -*-
"""Extra hand-drawn icons added for image-uniqueness pass.

Every word must have its own picture. Words that already own an accurate emoji
keep it; the rest get one of these SVGs. Same 64x64 flat-vector style as
scripts/make_icons.py.

Run: python scripts/make_icons_extra.py
"""
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

E = {}

E['grass'] = f'''
<path d="M8 54c2-14 6-24 10-30 0 10-2 22-4 30z" fill="{GREEN_D}"/>
<path d="M20 54c1-16 4-27 9-34-1 12-1 24-1 34z" fill="{GREEN}"/>
<path d="M32 54c0-18 2-30 6-38 1 13 2 26 2 38z" fill="{GREEN_D}"/>
<path d="M44 54c0-13 3-23 8-29 0 10-1 20-2 29z" fill="{GREEN}"/>
<path d="M54 54c1-10 3-17 6-21-1 8-1 14-1 21z" fill="{GREEN_D}"/>
<path d="M6 54h52" stroke="{GREEN_D}" stroke-width="3" stroke-linecap="round"/>
'''

E['vine'] = f'''
<path d="M14 52c14 2 16-10 8-16s-2-16 10-14 18-4 16-12" fill="none" stroke="{GREEN_D}" stroke-width="4" stroke-linecap="round"/>
<path d="M22 36c-8-2-12-8-8-14 6 0 10 5 10 12z" fill="{GREEN}"/>
<path d="M30 20c-2-8 2-13 8-12 1 7-2 12-8 14z" fill="{GREEN}"/>
<path d="M42 42c8 2 13-2 14-8-7-2-12 1-14 8z" fill="{GREEN}"/>
<circle cx="18" cy="48" r="2.4" fill="{CORAL}"/>
<circle cx="46" cy="16" r="2.4" fill="{CORAL}"/>
'''

E['willow'] = f'''
<rect x="29" y="34" width="6" height="24" rx="3" fill="{WOOD_D}"/>
<path d="M32 36c-8-4-14-10-16-18M32 34c8-3 14-9 17-16M32 30V12" stroke="{WOOD}" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M16 20c-4 6-6 14-6 22M22 18c-4 7-5 16-4 24M28 16c-2 8-3 17-2 25M36 16c2 8 3 17 2 25M42 18c4 7 5 16 4 24M48 20c4 6 6 14 6 22" stroke="{GREEN_D}" stroke-width="3" fill="none" stroke-linecap="round"/>
<g fill="{GREEN}">
<ellipse cx="10" cy="38" rx="2.4" ry="5"/><ellipse cx="18" cy="40" rx="2.4" ry="5"/><ellipse cx="26" cy="38" rx="2.4" ry="5"/>
<ellipse cx="38" cy="38" rx="2.4" ry="5"/><ellipse cx="46" cy="40" rx="2.4" ry="5"/><ellipse cx="54" cy="38" rx="2.4" ry="5"/>
</g>
'''

E['clear-and-bright'] = f'''
<circle cx="38" cy="22" r="9" fill="{ORANGE}"/>
<path d="M18 26a9 9 0 0 1 9-9 10 10 0 0 1 19 3 8 8 0 0 1 0 16H26a8 8 0 0 1-8-10z" fill="#DCE7EE"/>
<g stroke="{BLUE}" stroke-width="3" stroke-linecap="round">
<path d="M22 43l-2 6M32 43l-2 6M42 43l-2 6"/>
</g>
<path d="M15 54c6-6 10-7 13-4M49 54c-2-6-6-8-9-6" stroke="{GREEN_D}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
<path d="M32 56c3-5 7-8 12-9" stroke="{GREEN}" stroke-width="3" fill="none" stroke-linecap="round"/>
'''

E['seaweed'] = f'''
<path d="M12 56c8-8 2-14 8-22s0-14 6-20" fill="none" stroke="{GREEN_D}" stroke-width="5" stroke-linecap="round"/>
<path d="M28 56c-6-8 4-12 0-20s4-12 2-18" fill="none" stroke="{GREEN}" stroke-width="5" stroke-linecap="round"/>
<path d="M46 56c6-10-2-14 2-22s-2-12 0-18" fill="none" stroke="#5E8F52" stroke-width="5" stroke-linecap="round"/>
<path d="M52 56c4-6 0-10 3-16" fill="none" stroke="{GREEN_D}" stroke-width="4" stroke-linecap="round"/>
<g fill="{BLUE}" opacity=".7">
<circle cx="20" cy="20" r="2.2"/><circle cx="40" cy="14" r="2"/><circle cx="38" cy="30" r="1.8"/><circle cx="18" cy="38" r="1.8"/>
</g>
'''

E['tape-measure'] = f'''
<path d="M10 40h44v10H10z" fill="#F2C14E"/>
<path d="M10 44h44" stroke="#C99A2E" stroke-width="1.6"/>
<g stroke="#7A5A2A" stroke-width="1.4">
<path d="M16 40v4M21 40v4M26 40v4M31 40v4M36 40v4M41 40v4M46 40v4"/>
</g>
<rect x="38" y="18" width="20" height="20" rx="6" fill="#E8A24D" stroke="#C9812F" stroke-width="2"/>
<circle cx="48" cy="28" r="6" fill="{CREAM}"/>
<circle cx="48" cy="28" r="2.4" fill="{STEEL_D}"/>
<path d="M38 30h-8" stroke="#F2C14E" stroke-width="4" stroke-linecap="round"/>
'''

E['meter-stick'] = f'''
<rect x="6" y="40" width="52" height="16" rx="3" fill="#F2C14E" stroke="#C99A2E" stroke-width="2"/>
<g stroke="#7A5A2A" stroke-width="1.6">
<path d="M13 40v6M20 40v9M27 40v6M34 40v9M41 40v6M48 40v9"/>
</g>
<text x="32" y="35" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700" fill="{INK}" text-anchor="middle">1 m</text>
'''

E['centimeter'] = f'''
<rect x="18" y="38" width="28" height="14" rx="3" fill="{CREAM}" stroke="#C99A2E" stroke-width="2"/>
<g stroke="#B07A2A" stroke-width="1.4">
<path d="M24 38v7M29 38v5M34 38v7M39 38v5M44 38v7"/>
</g>
<text x="32" y="31" font-family="Segoe UI, sans-serif" font-size="12" font-weight="700" fill="{INK}" text-anchor="middle">1 cm</text>
<path d="M32 50v6M26 56h12" stroke="{STEEL_D}" stroke-width="2" stroke-linecap="round"/>
'''

E['waiter'] = f'''
<circle cx="26" cy="14" r="6" fill="#F2C7A0"/>
<path d="M18 24c0-3 3-5 8-5s8 2 8 5v18H18z" fill="{WHITE}" stroke="{INK}" stroke-opacity=".12" stroke-width="2"/>
<path d="M26 19l-4 6 4 3 4-3z" fill="{INK}"/>
<path d="M34 28l9-5" stroke="{WHITE}" stroke-width="5" stroke-linecap="round"/>
<ellipse cx="46" cy="20" rx="14" ry="3.4" fill="{STEEL_D}"/>
<path d="M34 20a12 6 0 0 1 24 0z" fill="{STEEL}"/>
<circle cx="46" cy="14" r="2" fill="{ORANGE}"/>
<path d="M18 44h16v10H18z" fill="{INK}" opacity=".78"/>
<path d="M20 44v-3h12v3" fill="none" stroke="{INK}" stroke-width="2"/>
'''

E['portion'] = f'''
<ellipse cx="32" cy="38" rx="22" ry="14" fill="{WHITE}" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<ellipse cx="32" cy="36" rx="15" ry="9" fill="#EAF0F3"/>
<path d="M22 36a8 6 0 0 1 16 0z" fill="{ORANGE}"/>
<circle cx="41" cy="33" r="3.4" fill="{GREEN}"/>
<path d="M9 22v20M9 22c-4 0-4 8 0 8M55 22v20M55 22c4 0 4 8 0 8" stroke="{STEEL_D}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
'''

E['fireplace'] = f'''
<rect x="8" y="10" width="48" height="42" rx="4" fill="#C98F6B"/>
<g stroke="#B07A58" stroke-width="1.6" opacity=".8">
<path d="M8 20h48M8 30h48M8 40h48M20 10v42M36 10v42"/>
</g>
<path d="M18 52V38a14 14 0 0 1 28 0v14z" fill="#3A3030"/>
<path d="M32 50c-7-6-6-13 0-19 6 6 7 13 0 19z" fill="{ORANGE}"/>
<path d="M32 50c-3-4-3-8 0-12 3 4 3 8 0 12z" fill="#F6D06B"/>
<rect x="6" y="52" width="52" height="6" rx="2" fill="#B07A58"/>
'''

E['hearth'] = f'''
<path d="M6 54V30l8-4 4 6 14-10 14 10 4-6 8 4v24z" fill="#A8A29A"/>
<path d="M18 54V40a14 14 0 0 1 28 0v14z" fill="#3A3030"/>
<path d="M32 52c-6-5-5-11 0-16 5 5 6 11 0 16z" fill="{CORAL}"/>
<path d="M32 52c-2-3-2-7 0-10 3 3 3 7 0 10z" fill="#F6D06B"/>
<path d="M14 54h36" stroke="#8A847C" stroke-width="4" stroke-linecap="round"/>
<g fill="#8A847C">
<circle cx="10" cy="30" r="2"/><circle cx="54" cy="30" r="2"/><circle cx="32" cy="16" r="2"/>
</g>
'''

E['eel'] = f'''
<path d="M6 42c10 10 20-14 30-6s14-2 22-8" fill="none" stroke="#5E8F72" stroke-width="9" stroke-linecap="round"/>
<path d="M58 28c4 1 6 4 5 7-4 0-6-2-7-5z" fill="#4E7D60"/>
<circle cx="12" cy="41" r="1.8" fill="{INK}"/>
<path d="M6 42c-3 2-4 5-3 8 3-1 5-3 6-6" fill="#4E7D60"/>
<path d="M22 36c6-2 10-2 16 0M30 44c6 2 10 1 16-2" stroke="#4E7D60" stroke-width="1.6" fill="none" opacity=".7"/>
'''

E['salmon'] = f'''
<path d="M8 32c8-12 22-16 32-10 5 3 8 7 12 9-4 3-8 7-13 9-10 5-23 2-31-8z" fill="#F08A7A"/>
<path d="M8 32l-4-7v16z" fill="#E2766A"/>
<path d="M40 22c4-3 9-3 13 0-4 2-9 2-13 0z" fill="#C95F55"/>
<circle cx="20" cy="30" r="2" fill="{INK}"/>
<g fill="#F7B9AC">
<circle cx="28" cy="26" r="1.6"/><circle cx="34" cy="30" r="1.6"/><circle cx="28" cy="36" r="1.6"/><circle cx="38" cy="24" r="1.5"/>
</g>
<path d="M32 24c4 4 6 8 6 12" stroke="#E2766A" stroke-width="1.6" fill="none" opacity=".7"/>
'''

E['stingray'] = f'''
<path d="M32 14c10 0 20 5 26 12-10 4-18 12-26 20-8-8-16-16-26-20 6-7 16-12 26-12z" fill="#7FA6C9"/>
<path d="M32 20c7 0 14 3 19 8-7 3-13 8-19 14-6-6-12-11-19-14 5-5 12-8 19-8z" fill="#9FBEDB" opacity=".8"/>
<circle cx="24" cy="26" r="1.8" fill="{INK}"/><circle cx="40" cy="26" r="1.8" fill="{INK}"/>
<path d="M32 46c-1 6 0 10 2 14" stroke="#5E83A8" stroke-width="3" fill="none" stroke-linecap="round"/>
<g fill="#5E83A8"><circle cx="20" cy="32" r="1.5"/><circle cx="44" cy="32" r="1.5"/><circle cx="30" cy="34" r="1.5"/><circle cx="35" cy="36" r="1.5"/></g>
'''

E['cold-dew'] = f'''
<path d="M14 50c18-2 30-14 34-32-16 0-32 10-34 32z" fill="{GREEN}"/>
<path d="M14 50c10-10 20-18 32-28" stroke="{GREEN_D}" stroke-width="2" fill="none"/>
<path d="M41 22c0-4 3-8 3-8s3 4 3 8a3 3 0 0 1-6 0z" fill="{BLUE}"/>
<path d="M26 36c0-3 2-6 2-6s2 3 2 6a2 2 0 0 1-4 0z" fill="#A8D8F5"/>
<circle cx="48" cy="16" r="2" fill="#A8D8F5" opacity=".8"/>
'''

E['sprout'] = f'''
<path d="M32 56V30" stroke="{GREEN_D}" stroke-width="4" stroke-linecap="round"/>
<path d="M32 34c-10 0-16-6-16-14 9 0 16 5 16 14z" fill="{GREEN}"/>
<path d="M32 30c10 0 16-6 16-14-9 0-16 5-16 14z" fill="#A9D386"/>
<path d="M18 54c8-6 20-6 28 0z" fill="#B08A5E"/>
<path d="M16 54c4-3 9-4 16-4s12 1 16 4" stroke="#8A6A44" stroke-width="2" fill="none" stroke-linecap="round"/>
'''

E['grain-rain'] = f'''
<path d="M12 20a8 8 0 0 1 8-8 10 10 0 0 1 19 3 7 7 0 0 1 0 14H20a8 8 0 0 1-8-9z" fill="#DCE7EE"/>
<g stroke="{BLUE}" stroke-width="2.6" stroke-linecap="round">
<path d="M20 33l-2 8M30 33l-2 8M40 33l-2 8M50 33l-2 8"/>
</g>
<path d="M32 44v12" stroke="{GREEN_D}" stroke-width="2.6" stroke-linecap="round"/>
<g fill="{ORANGE}">
<ellipse cx="28" cy="48" rx="3" ry="5" transform="rotate(-30 28 48)"/>
<ellipse cx="36" cy="48" rx="3" ry="5" transform="rotate(30 36 48)"/>
<ellipse cx="28" cy="54" rx="3" ry="5" transform="rotate(-30 28 54)"/>
<ellipse cx="36" cy="54" rx="3" ry="5" transform="rotate(30 36 54)"/>
</g>
'''

E['grain-in-ear'] = f'''
<path d="M32 58V18" stroke="{GREEN_D}" stroke-width="3" stroke-linecap="round"/>
<g stroke="{ORANGE}" stroke-width="2" fill="none" stroke-linecap="round">
<path d="M32 20l-8-8M32 20l8-8M32 28l-9-7M32 28l9-7M32 36l-9-7M32 36l9-7M32 44l-8-6M32 44l8-6"/>
</g>
<g fill="#E8A24D">
<ellipse cx="26" cy="18" rx="3.4" ry="5.4" transform="rotate(-40 26 18)"/>
<ellipse cx="38" cy="18" rx="3.4" ry="5.4" transform="rotate(40 38 18)"/>
<ellipse cx="24" cy="28" rx="3.4" ry="5.4" transform="rotate(-40 24 28)"/>
<ellipse cx="40" cy="28" rx="3.4" ry="5.4" transform="rotate(40 40 28)"/>
<ellipse cx="24" cy="38" rx="3.4" ry="5.4" transform="rotate(-40 24 38)"/>
<ellipse cx="40" cy="38" rx="3.4" ry="5.4" transform="rotate(40 40 38)"/>
</g>
<ellipse cx="32" cy="16" rx="3.6" ry="6" fill="#F2C14E"/>
'''

E['white-dew'] = f'''
<path d="M10 54c4-12 8-18 12-22M22 54c2-10 5-16 10-20M34 54c0-10 2-16 6-20M46 54c-1-8 1-14 5-17" stroke="{GREEN_D}" stroke-width="3" fill="none" stroke-linecap="round"/>
<g fill="{WHITE}" stroke="{BLUE}" stroke-width="1.2">
<path d="M22 22c0-3 2-6 2-6s2 3 2 6a2 2 0 0 1-4 0z"/>
<path d="M40 26c0-3 2-6 2-6s2 3 2 6a2 2 0 0 1-4 0z"/>
<path d="M30 34c0-2 1.6-4 1.6-4s1.6 2 1.6 4a1.6 1.6 0 0 1-3.2 0z"/>
</g>
'''

E['leak'] = f'''
<path d="M8 24h30v10H8z" fill="{STEEL}"/>
<rect x="34" y="22" width="6" height="14" rx="2" fill="{STEEL_D}"/>
<path d="M40 29h8" stroke="{STEEL_D}" stroke-width="6" stroke-linecap="round"/>
<path d="M48 32c0 4-2 5-2 8" stroke="{BLUE}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
<path d="M46 40c0-3 2-6 2-6s2 3 2 6a2 2 0 0 1-4 0z" fill="{BLUE}"/>
<ellipse cx="30" cy="48" rx="16" ry="5" fill="{BLUE}" opacity=".3"/>
<circle cx="44" cy="50" r="2" fill="{BLUE}" opacity=".5"/>
<circle cx="18" cy="46" r="1.6" fill="{BLUE}" opacity=".4"/>
'''

E['milliliter'] = f'''
<path d="M22 12h20l-3 42H25z" fill="#E4F0F6" stroke="{INK}" stroke-opacity=".14" stroke-width="2"/>
<path d="M24 20h16M25 28h14M26 36h12M27 44h10" stroke="{STEEL_D}" stroke-width="1.4" opacity=".7"/>
<path d="M23 30h18v12H23z" fill="{BLUE}" opacity=".35"/>
<text x="32" y="40" font-family="Segoe UI, sans-serif" font-size="9" font-weight="700" fill="{INK}" text-anchor="middle">1 mL</text>
<path d="M22 12h20" stroke="{STEEL_D}" stroke-width="3" stroke-linecap="round"/>
'''

E['kilogram'] = f'''
<path d="M18 20h28l-3 8 9 26a4 4 0 0 1-4 5H16a4 4 0 0 1-4-5l9-26z" fill="#8A959E"/>
<path d="M22 20a10 10 0 0 1 20 0" fill="none" stroke="#5E6B76" stroke-width="4" stroke-linecap="round"/>
<text x="32" y="44" font-family="Segoe UI, sans-serif" font-size="13" font-weight="700" fill="{WHITE}" text-anchor="middle">1 kg</text>
<path d="M22 26h20" stroke="#6C7681" stroke-width="2"/>
'''

E['gram'] = f'''
<path d="M22 24h20l-2 6 6 18a3 3 0 0 1-3 4H19a3 3 0 0 1-3-4l6-18z" fill="#A8B2BA"/>
<path d="M26 24a6 6 0 0 1 12 0" fill="none" stroke="#7E8A93" stroke-width="3" stroke-linecap="round"/>
<text x="32" y="44" font-family="Segoe UI, sans-serif" font-size="11" font-weight="700" fill="{WHITE}" text-anchor="middle">1 g</text>
'''

E['hallway'] = f'''
<path d="M6 54V20l26-10v44z" fill="#E8DFD2"/>
<path d="M32 54V10l26 10v34z" fill="#DCD0BE"/>
<path d="M14 54V26l12-5v33z" fill="#8A6A4A"/>
<path d="M32 54V18l8 3v33z" fill="#F1E9DC"/>
<rect x="24" y="38" width="16" height="8" fill="#C9786B"/>
<path d="M32 34v20" stroke="#B7A890" stroke-width="1.6"/>
<circle cx="29" cy="42" r="1.2" fill="{INK}"/>
<path d="M22 18l14-5" stroke="{ORANGE}" stroke-width="2" opacity=".6"/>
'''

E['velociraptor'] = f'''
<path d="M12 46c0-8 5-14 13-16l8-10 4 4-3 8 8-2 3 6-8 5-2 9-5-2 1-7-7 1-3 7-4-1 2-8c-4 1-7 4-7 6z" fill="#8FA85E"/>
<path d="M33 20l5-7 3 5-4 6z" fill="#A9C276"/>
<circle cx="26" cy="30" r="1.6" fill="{INK}"/>
<path d="M36 28l6-2M34 34l7 1" stroke="#6C8C4A" stroke-width="1.6" stroke-linecap="round"/>
<path d="M12 46c-4 2-6 5-6 8" stroke="#6C8C4A" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M22 42l-4 4M30 40l-3 5" stroke="#6C8C4A" stroke-width="2" stroke-linecap="round"/>
'''

E['raptor'] = f'''
<path d="M50 44c0-8-5-13-13-15l-7-9-4 4 3 7-9-2-2 6 8 5 2 8 5-1-1-7 7 1 3 6 4-1-2-7c4 1 6 3 6 5z" fill="#C98F5E"/>
<path d="M32 20l-4-7-3 5 4 6z" fill="#D9A875"/>
<circle cx="43" cy="31" r="1.6" fill="{INK}"/>
<path d="M34 28l-6-2M35 34l-7 1" stroke="#A8763E" stroke-width="1.6" stroke-linecap="round"/>
<path d="M50 44c4 2 6 5 6 8" stroke="#A8763E" stroke-width="4" fill="none" stroke-linecap="round"/>
<g fill="#A8763E" opacity=".6"><circle cx="28" cy="36" r="1.4"/><circle cx="24" cy="40" r="1.4"/><circle cx="38" cy="38" r="1.4"/></g>
'''

E['flood'] = f'''
<path d="M18 38V24l14-8 14 8v14" fill="#E8DFD2"/>
<path d="M14 38l18-10 18 10z" fill="#C9786B"/>
<rect x="28" y="28" width="8" height="10" fill="{WOOD_D}"/>
<path d="M38 38v-4h6v4" fill="#B7A890"/>
<path d="M4 42c6 4 12 4 18 0s12-4 18 0 12 4 20 0v8c-8 4-14 4-20 0s-12-4-18 0-12 4-18 0z" fill="{BLUE}"/>
<path d="M4 50c6 4 12 4 18 0s12-4 18 0 12 4 20 0v6c-8 4-14 4-20 0s-12-4-18 0-12 4-18 0z" fill="#4E9BD6"/>
<g stroke="{WHITE}" stroke-width="2" stroke-linecap="round" opacity=".7"><path d="M12 46h8M36 46h8M24 52h8"/></g>
'''

E['garden'] = f'''
<path d="M6 50h52" stroke="{WOOD_D}" stroke-width="3"/>
<g fill="{WHITE}" stroke="{WOOD}" stroke-width="2">
<path d="M10 50V32h8v18zM22 50V32h8v18zM34 50V32h8v18zM46 50V32h8v18z"/>
</g>
<path d="M6 40h52M18 32v18M30 32v18M42 32v18" stroke="{WOOD}" stroke-width="2"/>
<circle cx="20" cy="26" r="4" fill="{CORAL}"/><circle cx="20" cy="26" r="1.6" fill="#F6D06B"/>
<circle cx="36" cy="24" r="4" fill="#E8A24D"/><circle cx="36" cy="24" r="1.6" fill="#F6D06B"/>
<circle cx="50" cy="27" r="3.6" fill="#D98BB0"/><circle cx="50" cy="27" r="1.4" fill="#F6D06B"/>
<path d="M20 30v6M36 28v8M50 31v4" stroke="{GREEN_D}" stroke-width="2"/>
'''

E['rifle'] = f'''
<path d="M6 38h44v6H6z" fill="#5E4A36"/>
<path d="M50 38h6v6h-6z" fill="#3F4852"/>
<path d="M56 39h4v4h-4z" fill="#7E8A93"/>
<path d="M12 44h6l-2 10h-6z" fill="#7A5236"/>
<path d="M28 32h14v6H28z" fill="#3F4852"/>
<path d="M34 30h6v8h-6z" fill="#8A959E"/>
<path d="M18 44c0 4-2 6-2 6" stroke="#3F4852" stroke-width="3" fill="none" stroke-linecap="round"/>
<circle cx="46" cy="41" r="1.6" fill="{INK}" opacity=".6"/>
'''

E['pistol'] = f'''
<path d="M12 24h34v10H30l-2 6H18l-2-6h-4z" fill="#4E5762"/>
<path d="M18 34h10l-4 16H16z" fill="#5E4A36"/>
<path d="M46 26h6v6h-6z" fill="#3F4852"/>
<path d="M20 26h18" stroke="#8A959E" stroke-width="2"/>
<circle cx="26" cy="40" r="2" fill="{INK}" opacity=".5"/>
<path d="M12 24v10" stroke="#3F4852" stroke-width="2"/>
'''

E['jet'] = f'''
<path d="M32 6l7 22 17 10v6l-17-3-3 12 7 5v4l-11-3-11 3v-4l7-5-3-12-17 3v-6l17-10z" fill="#8A959E"/>
<path d="M32 6l4 14-4 8-4-8z" fill="#C3CCD3"/>
<path d="M27 40h10v6H27z" fill="{ORANGE}"/>
<circle cx="32" cy="24" r="2.4" fill="#5E6B76"/>
'''

E['beginning-of-autumn'] = f'''
<circle cx="44" cy="20" r="9" fill="{ORANGE}"/>
<path d="M10 44c10-2 18-8 22-18-12 0-20 7-22 18z" fill="{CORAL}"/>
<path d="M10 44c8-6 14-12 20-16" stroke="#C95745" stroke-width="2" fill="none"/>
<path d="M14 20c4 8 4 16 0 24" stroke="{BLUE}" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round"/>
<path d="M26 16c3 6 3 12 0 18" stroke="{BLUE}" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round"/>
<path d="M8 54c14-4 28-4 48 0" stroke="#B7A890" stroke-width="2" fill="none" stroke-linecap="round"/>
'''

E['season-wheel'] = f'''
<circle cx="32" cy="32" r="24" fill="{WHITE}" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<path d="M32 8a24 24 0 0 1 24 24H32z" fill="#F6D06B"/>
<path d="M56 32a24 24 0 0 1-24 24V32z" fill="{CORAL}"/>
<path d="M32 56a24 24 0 0 1-24-24h24z" fill="{ORANGE}"/>
<path d="M8 32A24 24 0 0 1 32 8v24z" fill="#A9D386"/>
<circle cx="32" cy="32" r="6" fill="{WHITE}" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<path d="M32 25v14M25 32h14" stroke="{INK}" stroke-opacity=".35" stroke-width="1.6"/>
'''

E['blizzard'] = f'''
<path d="M14 26a8 8 0 0 1 8-8 10 10 0 0 1 19 3 7 7 0 0 1 0 14H22a8 8 0 0 1-8-9z" fill="#A8B2BA"/>
<path d="M14 26a8 8 0 0 1 8-8 10 10 0 0 1 19 3" fill="#C3CCD3"/>
<g stroke="{BLUE}" stroke-width="3" stroke-linecap="round">
<path d="M18 40l-6 12M30 40l-6 14M42 40l-6 12M54 40l-5 10"/>
</g>
<g fill="{WHITE}" stroke="{BLUE}" stroke-width="1.2">
<circle cx="22" cy="18" r="2.6"/><circle cx="42" cy="16" r="2"/><circle cx="48" cy="48" r="2.6"/><circle cx="14" cy="52" r="2"/><circle cx="34" cy="54" r="2.4"/>
</g>
<path d="M32 8v6M29 10l3 2 3-2" stroke="{BLUE}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
'''

E['snowy-house'] = f'''
<path d="M12 30L32 12l20 18z" fill="{WHITE}" stroke="{BLUE}" stroke-width="2"/>
<path d="M18 30v24h28V30" fill="#E8DFD2"/>
<path d="M12 30h40" stroke="{BLUE}" stroke-width="2" opacity=".6"/>
<rect x="27" y="38" width="10" height="16" fill="{WOOD_D}"/>
<rect x="21" y="36" width="4" height="5" fill="{BLUE}"/>
<rect x="39" y="36" width="4" height="5" fill="{BLUE}"/>
<path d="M6 56c6-4 14-4 20 0s14 4 20 0 8-2 12 0" stroke="{WHITE}" stroke-width="5" fill="none" stroke-linecap="round"/>
<g fill="{WHITE}"><circle cx="12" cy="16" r="2"/><circle cx="50" cy="12" r="2"/><circle cx="56" cy="26" r="1.6"/><circle cx="8" cy="40" r="1.6"/></g>
'''

E['thermometer'] = f'''
<rect x="27" y="8" width="10" height="38" rx="5" fill="{WHITE}" stroke="{STEEL_D}" stroke-width="2"/>
<circle cx="32" cy="50" r="8" fill="{CORAL}" stroke="#C95745" stroke-width="2"/>
<rect x="29" y="24" width="6" height="26" fill="{CORAL}"/>
<g stroke="{STEEL_D}" stroke-width="1.4"><path d="M38 16h5M38 22h4M38 28h5M38 34h4"/></g>
<circle cx="32" cy="50" r="3" fill="#F7B2A0"/>
'''

E['seasonal'] = f'''
<rect x="9" y="10" width="46" height="46" rx="5" fill="{WHITE}" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<rect x="9" y="10" width="46" height="11" rx="5" fill="{CORAL}"/>
<g fill="{STEEL_D}"><circle cx="18" cy="10" r="2.6"/><circle cx="46" cy="10" r="2.6"/></g>
<rect x="15" y="27" width="12" height="10" rx="2" fill="#A9D386"/>
<rect x="37" y="27" width="12" height="10" rx="2" fill="#F6D06B"/>
<rect x="15" y="41" width="12" height="10" rx="2" fill="{ORANGE}"/>
<rect x="37" y="41" width="12" height="10" rx="2" fill="#BFDDE8"/>
'''

E['forecast'] = f'''
<path d="M18 24a7 7 0 0 1 7-7 9 9 0 0 1 17 3 6 6 0 0 1 0 12H25a6 6 0 0 1-7-8z" fill="#DCE7EE"/>
<circle cx="46" cy="18" r="6" fill="{ORANGE}"/>
<path d="M46 20v14M46 34l-6 23M46 34l6 23" stroke="{STEEL_D}" stroke-width="2" fill="none"/>
<path d="M10 52h44" stroke="{STEEL_D}" stroke-width="2"/>
<path d="M12 50l12-6 8 3 8-10 12-4" stroke="{CORAL}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="52" cy="33" r="2.4" fill="{CORAL}"/>
'''

E['coat'] = f'''
<path d="M24 12h16l9 8-4 7-4-3v26H23V24l-4 3-4-7z" fill="#6E7C8C"/>
<path d="M28 12c0 4 2 6 4 6s4-2 4-6" fill="none" stroke="#55616F" stroke-width="2"/>
<path d="M32 18v32" stroke="#55616F" stroke-width="2"/>
<g fill="#DCE3E8"><circle cx="29" cy="28" r="1.6"/><circle cx="29" cy="38" r="1.6"/></g>
<path d="M23 50h18" stroke="#55616F" stroke-width="2"/>
'''

E['cardigan'] = f'''
<path d="M22 12h8v40h-8l-8-7 3-6-4-1 2-18z" fill="#C98F8A"/>
<path d="M42 12h-8v40h8l8-7-3-6 4-1-2-18z" fill="#C98F8A"/>
<path d="M30 12v40M34 12v40" stroke="#A87670" stroke-width="1.6"/>
<g fill="{CREAM}"><circle cx="28.5" cy="22" r="1.4"/><circle cx="28.5" cy="30" r="1.4"/><circle cx="28.5" cy="38" r="1.4"/></g>
<path d="M22 12c2 4 5 6 10 6s8-2 10-6" fill="none" stroke="#A87670" stroke-width="2"/>
'''

E['allergy'] = f'''
<circle cx="32" cy="34" r="9" fill="{ORANGE}"/>
<g fill="#F6D06B"><ellipse cx="32" cy="16" rx="5" ry="8"/><ellipse cx="32" cy="52" rx="5" ry="8"/><ellipse cx="14" cy="34" rx="8" ry="5"/><ellipse cx="50" cy="34" rx="8" ry="5"/></g>
<circle cx="32" cy="34" r="4" fill="#C9782A"/>
<g fill="{CORAL}"><circle cx="18" cy="14" r="2"/><circle cx="47" cy="12" r="2.2"/><circle cx="54" cy="24" r="1.8"/><circle cx="12" cy="48" r="2"/><circle cx="52" cy="50" r="2"/><circle cx="9" cy="24" r="1.6"/></g>
<path d="M46 44c4 2 6 5 7 8" stroke="{CORAL}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
'''

E['clinic'] = f'''
<rect x="10" y="22" width="44" height="30" rx="3" fill="{WHITE}" stroke="{INK}" stroke-opacity=".14" stroke-width="2"/>
<path d="M6 24L32 8l26 16z" fill="#A8D8C0"/>
<rect x="26" y="36" width="12" height="16" fill="#BFDDE8"/>
<rect x="15" y="28" width="7" height="7" rx="1.5" fill="#BFDDE8"/><rect x="42" y="28" width="7" height="7" rx="1.5" fill="#BFDDE8"/>
<rect x="29" y="12" width="6" height="16" fill="{CORAL}"/><rect x="24" y="17" width="16" height="6" fill="{CORAL}"/>
<path d="M8 52h48" stroke="{GREEN_D}" stroke-width="3" stroke-linecap="round"/>
'''

E['coin'] = f'''
<g stroke="#C9A227" stroke-width="2">
<ellipse cx="32" cy="46" rx="18" ry="7" fill="#F2C14E"/>
<ellipse cx="32" cy="40" rx="18" ry="7" fill="#F6D06B"/>
<ellipse cx="32" cy="33" rx="18" ry="7" fill="#F2C14E"/>
<ellipse cx="32" cy="26" rx="18" ry="7" fill="#F6D06B"/>
<ellipse cx="32" cy="19" rx="18" ry="7" fill="#F2C14E"/>
</g>
<path d="M27 19c0-3 2-5 5-5s5 2 5 5" fill="none" stroke="#C9A227" stroke-width="2"/>
'''

E['ounce'] = f'''
<path d="M22 24h20l-2 6 6 18a3 3 0 0 1-3 4H19a3 3 0 0 1-3-4l6-18z" fill="#B08A5E"/>
<path d="M26 24a6 6 0 0 1 12 0" fill="none" stroke="#8A6A44" stroke-width="3" stroke-linecap="round"/>
<text x="32" y="45" font-family="Segoe UI, sans-serif" font-size="10" font-weight="700" fill="{WHITE}" text-anchor="middle">1 oz</text>
'''

E['present'] = f'''
<rect x="10" y="24" width="44" height="30" rx="3" fill="#7FA8C9"/>
<rect x="10" y="24" width="44" height="9" rx="2" fill="#5E8DB0"/>
<rect x="27" y="24" width="10" height="30" fill="#E8A24D"/>
<path d="M32 24c-8-2-14-6-12-11 3-3 9 1 12 8 3-7 9-11 12-8 2 5-4 9-12 11z" fill="#F6D06B"/>
<path d="M32 24c-4-6-4-10 0-10s4 4 0 10z" fill="#E8A24D"/>
'''

E['driver'] = f'''
<circle cx="14" cy="16" r="6" fill="#F2C7A0"/>
<path d="M6 30c0-4 3-6 8-6s8 2 8 6v10H6z" fill="{BLUE}"/>
<path d="M20 34h6" stroke="#F2C7A0" stroke-width="4" stroke-linecap="round"/>
<path d="M6 50c2-12 8-18 16-18s14 6 16 18z" fill="#55616F"/>
<circle cx="30" cy="36" r="13" fill="none" stroke="{INK}" stroke-width="4"/>
<path d="M30 24v12M30 36l10 4" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>
<rect x="44" y="26" width="14" height="18" rx="3" fill="#55616F"/>
<circle cx="51" cy="35" r="2" fill="{ORANGE}"/>
'''

E['garage'] = f'''
<path d="M6 28L32 10l26 18z" fill="#C9786B"/>
<rect x="10" y="28" width="44" height="26" fill="#E8DFD2"/>
<rect x="14" y="32" width="36" height="22" fill="#8A959E"/>
<g stroke="#B7BFC6" stroke-width="1.6"><path d="M14 38h36M14 44h36M14 50h36"/></g>
<path d="M18 54h10l2-8H20z" fill="{ORANGE}"/>
<rect x="24" y="40" width="8" height="4" rx="2" fill="#BFDDE8"/>
<circle cx="22" cy="52" r="3" fill="{INK}"/><circle cx="32" cy="52" r="3" fill="{INK}"/>
'''

E['gather'] = f'''
<circle cx="32" cy="16" r="7" fill="#F2C7A0"/>
<circle cx="14" cy="24" r="6" fill="#E8B58C"/>
<circle cx="50" cy="24" r="6" fill="#E8B58C"/>
<path d="M22 40c0-8 4-12 10-12s10 4 10 12v10H22z" fill="{CORAL}"/>
<path d="M4 46c0-7 3-10 8-10s8 3 8 10v6H4z" fill="{BLUE}"/>
<path d="M44 46c0-7 3-10 8-10s8 3 8 10v6H44z" fill="{GREEN}"/>
<path d="M26 34l-6 8M38 34l6 8" stroke="#F2C7A0" stroke-width="4" stroke-linecap="round"/>
<path d="M8 56h48" stroke="{STEEL_D}" stroke-width="2" stroke-linecap="round"/>
'''

E['weekend-calendar'] = f'''
<rect x="8" y="12" width="48" height="44" rx="5" fill="{WHITE}" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<rect x="8" y="12" width="48" height="11" rx="5" fill="{CORAL}"/>
<g fill="{STEEL_D}"><circle cx="18" cy="12" r="2.6"/><circle cx="46" cy="12" r="2.6"/></g>
<g fill="#E6E1D6">
<rect x="14" y="28" width="9" height="8" rx="1.6"/><rect x="27" y="28" width="9" height="8" rx="1.6"/><rect x="40" y="28" width="9" height="8" rx="1.6"/>
<rect x="14" y="39" width="9" height="8" rx="1.6"/>
</g>
<rect x="27" y="39" width="9" height="8" rx="1.6" fill="{ORANGE}"/>
<rect x="40" y="39" width="9" height="8" rx="1.6" fill="{ORANGE}"/>
<text x="31" y="22" font-family="Segoe UI, sans-serif" font-size="7" font-weight="700" fill="{WHITE}" text-anchor="middle">SAT</text>
'''

E['streamer'] = f'''
<path d="M12 46c8-12 16-18 26-20M16 52c10-14 20-20 30-22M8 38c6-10 14-16 24-19" stroke="{CORAL}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
<path d="M10 52c6-8 12-13 20-15M20 56c8-10 16-15 26-17" stroke="#E8A24D" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M38 20c4-6 10-8 16-6-2 7-8 10-16 6z" fill="{GREEN}"/>
<circle cx="46" cy="42" r="3" fill="{BLUE}"/>
<circle cx="54" cy="34" r="2.4" fill="#D98BB0"/>
<path d="M40 48l4 6M48 48l2 8" stroke="#D98BB0" stroke-width="2.4" stroke-linecap="round"/>
'''

E['tangerine'] = f'''
<ellipse cx="32" cy="36" rx="20" ry="17" fill="#F08A2E"/>
<ellipse cx="32" cy="36" rx="20" ry="17" fill="none" stroke="#D9741C" stroke-width="2"/>
<ellipse cx="25" cy="30" rx="6" ry="4" fill="#F7A65C" opacity=".55"/>
<path d="M32 19c0-4 2-6 4-8" stroke="{GREEN_D}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<path d="M36 12c4-3 8-2 10 0-2 3-6 4-10 3z" fill="{GREEN}"/>
<path d="M20 42c6 4 18 4 24 0" stroke="#D9741C" stroke-width="1.6" fill="none" opacity=".45"/>
'''

E['slice-bread'] = f'''
<path d="M18 14c8-6 20-6 28 0l4 8v30H14V22z" fill="#E8C79A"/>
<path d="M14 22h32" stroke="#C9A06B" stroke-width="2"/>
<path d="M18 14c8-6 20-6 28 0" fill="none" stroke="#C9A06B" stroke-width="2"/>
<path d="M20 26v20M26 26v20M32 26v20M38 26v20M44 26v20" stroke="#D9B27F" stroke-width="1.4" opacity=".6"/>
<path d="M10 52h44" stroke="#B7A890" stroke-width="2" stroke-linecap="round"/>
'''

E['rice-cooker'] = f'''
<rect x="10" y="24" width="44" height="28" rx="8" fill="{WHITE}" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<path d="M12 32h40" stroke="{STEEL_D}" stroke-width="2"/>
<path d="M18 24c0-8 6-12 14-12s14 4 14 12z" fill="#E8DFD2"/>
<circle cx="32" cy="15" r="2.6" fill="{STEEL_D}"/>
<rect x="22" y="38" width="20" height="7" rx="3" fill="{ORANGE}" opacity=".85"/>
<rect x="14" y="52" width="6" height="4" rx="2" fill="{STEEL_D}"/>
<rect x="44" y="52" width="6" height="4" rx="2" fill="{STEEL_D}"/>
<circle cx="46" cy="44" r="2" fill="{GREEN}"/>
'''

E['quart'] = f'''
<path d="M22 12h20l6 14v28H16V26z" fill="#F4F0E6" stroke="{INK}" stroke-opacity=".14" stroke-width="2"/>
<path d="M22 12h20l2 6H20z" fill="{BLUE}"/>
<path d="M16 32h32" stroke="{BLUE}" stroke-width="2" opacity=".6"/>
<text x="32" y="44" font-family="Segoe UI, sans-serif" font-size="11" font-weight="700" fill="{INK}" text-anchor="middle">1 qt</text>
<path d="M24 48h16" stroke="{STEEL}" stroke-width="2"/>
'''

E['dozen-eggs'] = f'''
<path d="M6 34h52v18a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z" fill="#C9A97A"/>
<path d="M6 34h52" stroke="#A8885A" stroke-width="2"/>
<g fill="{WHITE}" stroke="#D8CDBB" stroke-width="1.6">
<ellipse cx="17" cy="34" rx="6" ry="8"/><ellipse cx="32" cy="34" rx="6" ry="8"/><ellipse cx="47" cy="34" rx="6" ry="8"/>
<ellipse cx="24" cy="44" rx="6" ry="7"/><ellipse cx="40" cy="44" rx="6" ry="7"/>
</g>
<path d="M14 48h36" stroke="#A8885A" stroke-width="1.6" opacity=".6"/>
'''

E['pot'] = f'''
<ellipse cx="32" cy="30" rx="22" ry="6" fill="#8A959E"/>
<path d="M10 30h44v16a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8z" fill="{STEEL}"/>
<path d="M10 34c-4 0-6 3-6 6s2 6 6 6M54 34c4 0 6 3 6 6s-2 6-6 6" fill="none" stroke="{STEEL_D}" stroke-width="4"/>
<path d="M24 22c-2-4 0-6 2-8M32 22c-2-4 0-6 2-8M40 22c-2-4 0-6 2-8" stroke="{GREY}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<path d="M22 30v20M42 30v20" stroke="#A8B2BA" stroke-width="2" opacity=".6"/>
'''

E['chocolate-bar'] = f'''
<rect x="10" y="14" width="44" height="38" rx="4" fill="#7A4B2A"/>
<rect x="10" y="14" width="44" height="38" rx="4" fill="none" stroke="#5C3A20" stroke-width="2"/>
<g fill="#8F5A33">
<rect x="15" y="19" width="14" height="12" rx="1.5"/><rect x="35" y="19" width="14" height="12" rx="1.5"/>
<rect x="15" y="35" width="14" height="12" rx="1.5"/><rect x="35" y="35" width="14" height="12" rx="1.5"/>
</g>
<path d="M15 19h14M15 35h14M35 19h14M35 35h14" stroke="#A87048" stroke-width="1.2" opacity=".6"/>
<path d="M10 18c10-4 34-4 44 0" stroke="#A87048" stroke-width="2" opacity=".5"/>
'''

E['nail'] = f'''
<path d="M28 6h8v8h-8z" fill="{STEEL_D}"/>
<path d="M30 14h4v40h-4z" fill="{GREY}"/>
<path d="M30 54h4l-2 6z" fill="#8A959E"/>
<path d="M26 6h12v4H26z" fill="#A8B2BA"/>
<path d="M30 16v38" stroke="#E6EBEF" stroke-width="1.2" opacity=".7"/>
'''

E['equinoxa'] = f'''
<circle cx="32" cy="32" r="22" fill="#BFDDE8"/>
<path d="M32 10a22 22 0 0 0 0 44z" fill="#4E5762"/>
<path d="M32 10v44" stroke="{ORANGE}" stroke-width="2.4" stroke-dasharray="3 3"/>
<circle cx="32" cy="32" r="22" fill="none" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<path d="M10 32h44" stroke="{WHITE}" stroke-width="2" opacity=".7"/>
<circle cx="42" cy="24" r="3" fill="{WHITE}" opacity=".8"/>
'''

E['bedroom'] = f'''
<rect x="8" y="34" width="40" height="16" rx="3" fill="{WOOD}"/>
<rect x="8" y="34" width="40" height="5" fill="{WOOD_D}"/>
<rect x="12" y="28" width="12" height="8" rx="2" fill="{WHITE}"/>
<rect x="24" y="30" width="20" height="6" rx="2" fill="#9FBFD8"/>
<rect x="48" y="18" width="8" height="32" rx="2" fill="{WOOD_D}"/>
<path d="M52 18v-4" stroke="{STEEL_D}" stroke-width="2"/>
<path d="M46 28l6-6" stroke="#F6D06B" stroke-width="3" stroke-linecap="round"/>
<path d="M8 50h48" stroke="{WOOD_D}" stroke-width="3" stroke-linecap="round"/>
'''

E['living-room'] = f'''
<rect x="8" y="26" width="34" height="14" rx="4" fill="#7FA8C9"/>
<rect x="8" y="24" width="34" height="8" rx="4" fill="#9FBFD8"/>
<rect x="4" y="30" width="8" height="14" rx="3" fill="#6E91B0"/>
<rect x="38" y="30" width="8" height="14" rx="3" fill="#6E91B0"/>
<rect x="14" y="38" width="22" height="8" rx="2" fill="#6E91B0"/>
<rect x="48" y="20" width="12" height="14" rx="2" fill="#3F4852"/>
<rect x="50" y="22" width="8" height="10" fill="#BFDDE8"/>
<path d="M52 34v8M46 42h16" stroke="#3F4852" stroke-width="2"/>
<path d="M6 50h52" stroke="{WOOD_D}" stroke-width="3" stroke-linecap="round"/>
'''

E['kitchen'] = f'''
<rect x="8" y="34" width="48" height="18" rx="2" fill="{WOOD}"/>
<rect x="8" y="34" width="48" height="4" fill="#E8DFD2"/>
<rect x="12" y="40" width="16" height="10" rx="1.5" fill="{WOOD_D}" opacity=".5"/>
<rect x="36" y="40" width="16" height="10" rx="1.5" fill="{WOOD_D}" opacity=".5"/>
<path d="M30 40v10" stroke="{WOOD_D}" stroke-width="3"/>
<rect x="37" y="24" width="16" height="10" rx="2" fill="{STEEL}"/>
<g fill="#4E5762"><circle cx="41" cy="29" r="2.4"/><circle cx="49" cy="29" r="2.4"/></g>
<path d="M39 22v-6M45 22v-6M51 22v-6" stroke="{STEEL_D}" stroke-width="2"/>
<rect x="14" y="22" width="16" height="12" rx="2" fill="{CREAM}" stroke="{STEEL_D}" stroke-width="1.6"/>
<rect x="17" y="25" width="10" height="6" rx="1" fill="{BLUE}" opacity=".5"/>
'''

E['gloves'] = f'''
<path d="M14 30V16a4 4 0 0 1 8 0v10V14a4 4 0 0 1 8 0v12V16a4 4 0 0 1 8 0v14V20a4 4 0 0 1 8 0v20c0 10-6 16-16 16s-16-6-16-16z" fill="#6E7C8C"/>
<path d="M14 34c-4-1-6 2-5 5s3 4 5 3M46 34c4-1 6 2 5 5s-3 4-5 3" fill="#5E6B7A"/>
<path d="M22 44h20" stroke="#8A97A6" stroke-width="2" opacity=".6"/>
'''

E['diplodocus'] = f'''
<path d="M6 48c0-6 4-10 10-10h16c6 0 10 3 12 7" fill="none" stroke="#8FA85E" stroke-width="14" stroke-linecap="round"/>
<path d="M44 45c8-2 12-8 12-16 0-6 2-10 4-14" fill="none" stroke="#8FA85E" stroke-width="10" stroke-linecap="round"/>
<circle cx="60" cy="13" r="5" fill="#A9C276"/>
<circle cx="61" cy="12" r="1.3" fill="{INK}"/>
<path d="M8 48l-4 8M18 48l-2 8M30 48l-2 8" stroke="#6C8C4A" stroke-width="5" stroke-linecap="round"/>
<path d="M10 38c6-2 14-2 20 0" stroke="#A9C276" stroke-width="2" fill="none" opacity=".7"/>
'''

E['palm'] = f'''
<path d="M30 56c0-14 1-24 4-34" stroke="{WOOD_D}" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M34 22c-8-6-16-6-22 0 8 2 16 2 22 0zM34 22c2-10 8-16 16-18-2 8-8 14-16 18zM34 22c8-4 16-2 20 4-8 2-15 0-20-4zM34 22c-6 2-10 8-10 14 6-3 10-8 10-14z" fill="{GREEN}"/>
<circle cx="32" cy="24" r="3" fill="#8A5A2A"/>
<path d="M24 56h20" stroke="#E8DFD2" stroke-width="4" stroke-linecap="round"/>
'''

E['ocean'] = f'''
<circle cx="46" cy="16" r="7" fill="{ORANGE}"/>
<path d="M4 34c8 6 16 6 24 0s16-6 24 0 8 6 8 6v18H4z" fill="#4E9BD6"/>
<path d="M4 34c8 6 16 6 24 0s16-6 24 0" fill="none" stroke="#7FC4E8" stroke-width="3"/>
<path d="M4 44c8 6 16 6 24 0s16-6 24 0 8 6 8 6" fill="none" stroke="{WHITE}" stroke-width="2.4" opacity=".65"/>
<g stroke="{WHITE}" stroke-width="1.6" opacity=".5"><path d="M14 30c2-3 4-3 6 0M34 30c2-3 4-3 6 0"/></g>
'''

E['oak'] = f'''
<rect x="28" y="36" width="8" height="22" rx="3" fill="#8A6A44"/>
<path d="M32 40c-10-4-16-12-16-22 10 0 16 6 16 16 0-10 6-16 16-16 0 10-6 18-16 22z" fill="{GREEN}"/>
<path d="M32 26c-4-4-4-10 0-14 4 4 4 10 0 14z" fill="#A9D386"/>
<circle cx="20" cy="40" r="4" fill="#B07A2A"/><circle cx="20" cy="40" r="1.6" fill="#8A5A1A"/>
<circle cx="44" cy="42" r="4" fill="#B07A2A"/><circle cx="44" cy="42" r="1.6" fill="#8A5A1A"/>
'''

E['bloom'] = f'''
<g fill="#E9A0B8">
<ellipse cx="32" cy="14" rx="7" ry="11"/>
<ellipse cx="32" cy="42" rx="7" ry="11"/>
<ellipse cx="14" cy="28" rx="11" ry="7"/>
<ellipse cx="50" cy="28" rx="11" ry="7"/>
<ellipse cx="20" cy="16" rx="7" ry="9" transform="rotate(-45 20 16)"/>
<ellipse cx="44" cy="16" rx="7" ry="9" transform="rotate(45 44 16)"/>
</g>
<circle cx="32" cy="28" r="7" fill="#F6D06B"/>
<path d="M32 34v18" stroke="{GREEN_D}" stroke-width="3" stroke-linecap="round"/>
<path d="M32 44c-6-2-10-6-10-12 6 0 10 4 10 12z" fill="{GREEN}"/>
'''

E['grain-full'] = f'''
<path d="M18 54c6-8 8-16 8-26M32 54V22M46 54c-4-8-6-16-6-24" stroke="{GREEN_D}" stroke-width="3" fill="none" stroke-linecap="round"/>
<g fill="#E8A24D">
<ellipse cx="22" cy="28" rx="4" ry="6" transform="rotate(-30 22 28)"/><ellipse cx="28" cy="24" rx="4" ry="6" transform="rotate(30 28 24)"/>
<ellipse cx="32" cy="18" rx="4" ry="6"/><ellipse cx="32" cy="30" rx="4" ry="6"/>
<ellipse cx="38" cy="24" rx="4" ry="6" transform="rotate(-30 38 24)"/><ellipse cx="44" cy="30" rx="4" ry="6" transform="rotate(30 44 30)"/>
</g>
<path d="M14 34c6-2 12-2 18 0M34 34c6-2 12-2 16 0" stroke="#E8A24D" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<ellipse cx="32" cy="50" rx="20" ry="4" fill="#C9A97A"/>
'''

E['solstice'] = f'''
<circle cx="32" cy="30" r="11" fill="{ORANGE}"/>
<g stroke="{ORANGE}" stroke-width="2.4" stroke-linecap="round">
<path d="M32 12v6M32 42v6M14 30h6M44 30h6M19 17l4 4M41 39l4 4M45 17l-4 4M23 39l-4 4"/>
</g>
<path d="M8 50c8-6 16-6 24 0s16 6 24 0" fill="none" stroke="{BLUE}" stroke-width="3"/>
<circle cx="14" cy="46" r="4" fill="#8FA85E"/>
<path d="M14 42v-4M10 46h-4M18 46h4" stroke="#6C8C4A" stroke-width="1.6" stroke-linecap="round"/>
<path d="M8 56h48" stroke="{STEEL_D}" stroke-width="2"/>
'''

E['balcony'] = f'''
<rect x="8" y="14" width="48" height="26" fill="#EAF3F8"/>
<path d="M8 14h48M32 14v26M8 27h48" stroke="{WHITE}" stroke-width="3"/>
<rect x="6" y="40" width="52" height="5" rx="2" fill="{STEEL_D}"/>
<path d="M12 40v12M20 40v12M28 40v12M36 40v12M44 40v12M52 40v12" stroke="{STEEL_D}" stroke-width="2.4"/>
<path d="M6 52h52" stroke="{STEEL_D}" stroke-width="3"/>
<path d="M46 40c-4 0-6-3-6-6 0-4 3-6 6-6s6 2 6 6c0 3-2 6-6 6z" fill="{GREEN}" opacity=".7"/>
'''

E['blow-out'] = f'''
<rect x="26" y="26" width="12" height="30" rx="4" fill="#F4E3C3"/>
<rect x="26" y="26" width="12" height="10" rx="3" fill="#F6D06B"/>
<path d="M32 26V18" stroke="{INK}" stroke-width="2"/>
<path d="M32 18c-3 0-5-3-3-6 2 3 5 3 3 6z" fill="{CORAL}"/>
<path d="M32 16c4-2 6 1 6 3" stroke="{STEEL}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>
<path d="M18 34c4 2 6 4 6 7" stroke="{BLUE}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<path d="M46 34c-4 2-6 4-6 7" stroke="{BLUE}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<rect x="18" y="54" width="28" height="4" rx="2" fill="{STEEL_D}"/>
'''

E['candle'] = f'''
<rect x="26" y="24" width="12" height="28" rx="3" fill="#F4E3C3"/>
<path d="M30 24c0-4 1-6 2-8 1 2 2 4 2 8" fill="{CORAL}"/>
<path d="M32 20c-3-2-3-6 0-9 3 3 3 7 0 9z" fill="{ORANGE}"/>
<path d="M32 18c-1-1-1-3 0-4 1 1 1 3 0 4z" fill="#F6D06B"/>
<path d="M20 52h24l-2 6H22z" fill="{STEEL_D}"/>
<path d="M24 30c-2 2-3 5-3 8" stroke="{WHITE}" stroke-width="2" fill="none" opacity=".6"/>
'''

E['major-cold'] = f'''
<circle cx="32" cy="32" r="22" fill="#DCE7EE"/>
<g stroke="{BLUE}" stroke-width="2.4" stroke-linecap="round">
<path d="M32 14v36M17 23l30 18M47 23L17 41"/>
<path d="M32 14l-4 5M32 14l4 5M32 50l-4-5M32 50l4-5"/>
</g>
<rect x="44" y="10" width="10" height="26" rx="5" fill="{WHITE}" stroke="{STEEL_D}" stroke-width="2"/>
<circle cx="49" cy="40" r="6" fill="{BLUE}"/>
<rect x="47" y="20" width="4" height="20" fill="{BLUE}"/>
<circle cx="49" cy="40" r="2.4" fill="#A8D8F5"/>
'''

E['fuse'] = f'''
<rect x="14" y="26" width="36" height="14" rx="3" fill="#C9B48A"/>
<rect x="14" y="26" width="10" height="14" rx="3" fill="{STEEL_D}"/>
<rect x="40" y="26" width="10" height="14" rx="3" fill="{STEEL_D}"/>
<path d="M24 33h16" stroke="#8A6A44" stroke-width="2"/>
<path d="M6 33h8M50 33h8" stroke="{STEEL_D}" stroke-width="3" stroke-linecap="round"/>
<path d="M26 22c2-3 4-3 6 0s4 3 6 0" stroke="{CORAL}" stroke-width="2" fill="none" stroke-linecap="round"/>
'''

E['trousers'] = f'''
<path d="M22 10h20l2 20-2 24h-7l-3-20-3 20h-7l-2-24z" fill="#4E6A8C"/>
<path d="M22 10h20l1 6H21z" fill="#3F5875"/>
<path d="M28 18v14M36 18v14" stroke="#3F5875" stroke-width="1.6" opacity=".7"/>
<rect x="24" y="34" width="6" height="4" rx="2" fill="#E8DFD2" opacity=".5"/>
<path d="M27 54h6M35 54h6" stroke="#3F5875" stroke-width="2"/>
'''

E['try-on'] = f'''
<ellipse cx="32" cy="26" rx="16" ry="19" fill="{WOOD}"/>
<ellipse cx="32" cy="26" rx="12" ry="15" fill="#D6E7F0"/>
<path d="M24 18c-2 4-3 8-2 12" stroke="{WHITE}" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M30 20h4l2 6 6 14H22l6-14z" fill="{CORAL}" opacity=".85"/>
<path d="M32 48v8" stroke="{WOOD_D}" stroke-width="3"/>
<rect x="22" y="56" width="20" height="4" rx="2" fill="{WOOD_D}"/>
'''

E['ceremony'] = f'''
<rect x="16" y="36" width="32" height="16" rx="2" fill="{WOOD}"/>
<path d="M16 40h32" stroke="{CORAL}" stroke-width="3"/>
<path d="M12 20h40v6H12z" fill="{ORANGE}"/>
<path d="M18 26v10M46 26v10" stroke="{WOOD_D}" stroke-width="2"/>
<path d="M22 52c0-8 4-12 10-12s10 4 10 12" fill="#E8DFD2"/>
<circle cx="32" cy="46" r="5" fill="#F2C7A0"/>
<path d="M32 14V6M26 10l6 4 6-4" stroke="{CORAL}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
'''

E['pair-shoes'] = f'''
<path d="M6 44c0-8 3-12 8-12l6 2 6 8 12 2c4 1 6 3 6 6H6z" fill="{CORAL}"/>
<path d="M6 50h32" stroke="#C95745" stroke-width="3"/>
<path d="M26 44c0-8 3-12 8-12l6 2 6 8 12 2c4 1 6 3 6 6H26z" fill="#E8A24D"/>
<path d="M26 50h32" stroke="#C9812F" stroke-width="3"/>
<g stroke="{WHITE}" stroke-width="1.8" opacity=".8"><path d="M12 38l4 4M16 34l4 4M32 38l4 4M36 34l4 4"/></g>
'''

E['dentist'] = f'''
<path d="M32 10c-5 0-8 3-11 3-4 0-7 3-7 9 0 9 4 14 6 20 1 4 3 8 5 8 2 0 2-6 3-10 1-3 3-4 4-4s3 1 4 4c1 4 1 10 3 10 2 0 4-4 5-8 2-6 6-11 6-20 0-6-3-9-7-9-3 0-6-3-11-3z" fill="{WHITE}" stroke="{INK}" stroke-opacity=".18" stroke-width="2"/>
<circle cx="44" cy="30" r="8" fill="{BLUE}" opacity=".35"/>
<path d="M44 22v16" stroke="{STEEL_D}" stroke-width="2"/>
<path d="M52 30h6" stroke="{STEEL_D}" stroke-width="3" stroke-linecap="round"/>
<path d="M22 22c-2 2-3 5-3 8" stroke="{STEEL}" stroke-width="2" fill="none" stroke-linecap="round"/>
'''

E['patient'] = f'''
<rect x="6" y="36" width="42" height="10" rx="3" fill="{WOOD}"/>
<rect x="6" y="30" width="10" height="10" rx="2" fill="{WHITE}"/>
<rect x="16" y="32" width="30" height="8" rx="3" fill="#9FBFD8"/>
<circle cx="42" cy="24" r="6" fill="#F2C7A0"/>
<path d="M36 32c0-4 3-6 7-6s7 2 7 6" fill="{BLUE}" opacity=".7"/>
<rect x="46" y="6" width="10" height="18" rx="5" fill="{WHITE}" stroke="{STEEL_D}" stroke-width="2"/>
<circle cx="51" cy="28" r="5" fill="{CORAL}"/>
<rect x="49" y="14" width="4" height="12" fill="{CORAL}"/>
<path d="M14 50v6M42 50v6" stroke="{WOOD_D}" stroke-width="3"/>
'''

E['pharmacist'] = f'''
<circle cx="26" cy="16" r="6" fill="#F2C7A0"/>
<path d="M18 28c0-3 3-6 8-6s8 3 8 6v20H18z" fill="{WHITE}" stroke="{INK}" stroke-opacity=".14" stroke-width="2"/>
<path d="M26 24l-3 4 3 3 3-3z" fill="{GREEN_D}"/>
<path d="M22 48h8v10h-8z" fill="#55616F"/>
<path d="M40 34h16l-2 8c0 4-3 7-6 7s-6-3-6-7z" fill="{CREAM}" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<path d="M42 52h12l-1 4H43z" fill="{WOOD_D}"/>
<path d="M48 24v10l3 4" stroke="{WOOD_D}" stroke-width="3" fill="none" stroke-linecap="round"/>
<circle cx="48" cy="24" r="3" fill="{WOOD}"/>
'''

E['today'] = f'''
<rect x="9" y="10" width="46" height="46" rx="5" fill="{WHITE}" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<rect x="9" y="10" width="46" height="11" rx="5" fill="{CORAL}"/>
<g fill="{STEEL_D}"><circle cx="19" cy="10" r="2.6"/><circle cx="45" cy="10" r="2.6"/></g>
<g stroke="#D8D2C6" stroke-width="1.6">
<path d="M16 30h32M16 38h32M16 46h32M24 24v30M32 24v30M40 24v30"/>
</g>
<rect x="25" y="31" width="7" height="7" rx="1.4" fill="{ORANGE}"/>
<circle cx="45" cy="50" r="9" fill="{GREEN}"/>
<path d="M41 50l3 3 5-6" stroke="{WHITE}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
'''

E['recipe'] = f'''
<rect x="12" y="8" width="40" height="48" rx="3" fill="{WHITE}" stroke="{INK}" stroke-opacity=".14" stroke-width="2"/>
<rect x="18" y="16" width="28" height="6" rx="2" fill="{CORAL}"/>
<g stroke="#C9C2B5" stroke-width="2" stroke-linecap="round"><path d="M18 30h28M18 36h28M18 42h20M18 48h24"/></g>
<circle cx="48" cy="46" r="8" fill="#A9D386"/>
<path d="M44 46a4 4 0 0 1 8 0 4 4 0 0 1-8 0z" fill="#6C9A4E"/>
'''

E['cooking'] = f'''
<path d="M12 34h32v12a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8z" fill="{STEEL}"/>
<path d="M12 38H6v6h6M44 38h6v6h-6" fill="{STEEL_D}"/>
<path d="M40 30l10-10" stroke="{WOOD}" stroke-width="3" stroke-linecap="round"/>
<path d="M22 26c-2-4 0-6 2-9M30 26c-2-4 0-6 2-9M38 26c-2-4 0-6 2-9" stroke="{GREY}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
<ellipse cx="28" cy="34" rx="16" ry="4" fill="#A8B2BA"/>
'''

E['philately'] = f'''
<rect x="10" y="12" width="34" height="40" rx="2" fill="#BFDDE8" stroke="{INK}" stroke-opacity=".14" stroke-width="2"/>
<rect x="14" y="16" width="26" height="32" fill="#EAF3F8" stroke="{STEEL_D}" stroke-width="1.4" stroke-dasharray="3 3"/>
<circle cx="27" cy="30" r="7" fill="{CORAL}"/>
<path d="M18 44c3-6 6-8 9-8s6 2 9 8z" fill="{BLUE}"/>
<circle cx="46" cy="42" r="9" fill="none" stroke="{WOOD_D}" stroke-width="3"/>
<path d="M52 49l7 7" stroke="{WOOD_D}" stroke-width="4" stroke-linecap="round"/>
<circle cx="46" cy="42" r="6" fill="{WHITE}" opacity=".35"/>
'''

E['weekday'] = f'''
<rect x="8" y="12" width="48" height="44" rx="5" fill="{WHITE}" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<rect x="8" y="12" width="48" height="11" rx="5" fill="{BLUE}"/>
<g fill="{STEEL_D}"><circle cx="18" cy="12" r="2.6"/><circle cx="46" cy="12" r="2.6"/></g>
<g fill="{BLUE}">
<rect x="14" y="28" width="8" height="8" rx="1.6"/><rect x="25" y="28" width="8" height="8" rx="1.6"/><rect x="36" y="28" width="8" height="8" rx="1.6"/><rect x="47" y="28" width="6" height="8" rx="1.6"/>
<rect x="14" y="40" width="8" height="8" rx="1.6"/>
</g>
<g fill="#E6E1D6"><rect x="25" y="40" width="8" height="8" rx="1.6"/><rect x="36" y="40" width="8" height="8" rx="1.6"/><rect x="47" y="40" width="6" height="8" rx="1.6"/></g>
<text x="32" y="22" font-family="Segoe UI, sans-serif" font-size="6.5" font-weight="700" fill="{WHITE}" text-anchor="middle">MON-FRI</text>
'''

E['yard'] = f'''
<path d="M10 34L32 18l22 16z" fill="#C9786B"/>
<rect x="18" y="34" width="28" height="18" fill="#E8DFD2"/>
<rect x="27" y="40" width="10" height="12" fill="{WOOD_D}"/>
<rect x="21" y="38" width="4" height="4" fill="{BLUE}"/>
<path d="M6 56h52" stroke="{GREEN_D}" stroke-width="4" stroke-linecap="round"/>
<path d="M8 52V42M14 52V42M20 52V42" stroke="{WOOD}" stroke-width="2.4"/>
<path d="M6 44h16" stroke="{WOOD}" stroke-width="2.4"/>
<circle cx="50" cy="46" r="4" fill="{GREEN}"/>
<rect x="49" y="46" width="2" height="8" fill="{WOOD_D}"/>
'''

E['ton'] = f'''
<rect x="14" y="26" width="36" height="24" rx="4" fill="#8A959E"/>
<path d="M20 26V18a12 12 0 0 1 24 0v8" fill="none" stroke="#5E6B76" stroke-width="4" stroke-linecap="round"/>
<text x="32" y="44" font-family="Segoe UI, sans-serif" font-size="14" font-weight="700" fill="{WHITE}" text-anchor="middle">1 t</text>
<path d="M18 50v6M46 50v6" stroke="#5E6B76" stroke-width="3" stroke-linecap="round"/>
'''

E['pound'] = f'''
<path d="M20 22h24l-2 7 7 19a4 4 0 0 1-4 5H19a4 4 0 0 1-4-5l7-19z" fill="#A8B2BA"/>
<path d="M26 22a6 6 0 0 1 12 0" fill="none" stroke="#7E8A93" stroke-width="3" stroke-linecap="round"/>
<text x="32" y="44" font-family="Segoe UI, sans-serif" font-size="10" font-weight="700" fill="{WHITE}" text-anchor="middle">1 lb</text>
'''

E['teapot'] = f'''
<path d="M14 30h32v12a12 12 0 0 1-12 12H26a12 12 0 0 1-12-12z" fill="{CORAL}"/>
<path d="M14 32c-8 2-12 8-10 14 1 4 5 5 7 2" fill="none" stroke="#D8614F" stroke-width="5" stroke-linecap="round"/>
<path d="M46 34c8 2 12 7 10 13-2 5-7 5-8 2" fill="none" stroke="{CORAL}" stroke-width="5" stroke-linecap="round"/>
<path d="M26 30c0-6 3-9 6-9s6 3 6 9" fill="#D8614F"/>
<circle cx="32" cy="20" r="3" fill="{WOOD_D}"/>
<path d="M20 38c0 6 2 10 5 12" stroke="{WHITE}" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round"/>
'''

E['seal'] = f'''
<path d="M10 40c0-12 10-20 24-20s24 8 24 20c0 8-6 12-12 12H22c-7 0-12-4-12-12z" fill="#A8B2BA"/>
<circle cx="26" cy="34" r="2.4" fill="{INK}"/>
<circle cx="42" cy="34" r="2.4" fill="{INK}"/>
<ellipse cx="34" cy="42" rx="5" ry="3.4" fill="#8A959E"/>
<path d="M34 42v4M29 46c2 4 8 4 10 0" stroke="#5E6B76" stroke-width="1.6" fill="none" stroke-linecap="round"/>
<g stroke="#5E6B76" stroke-width="1.4" opacity=".6"><path d="M24 44l-8 4M22 40l-9 2M44 44l8 4M46 40l9 2"/></g>
<path d="M30 52c-1 4 1 6 4 6s5-2 4-6" fill="#8A959E"/>
'''

E['branch'] = f'''
<path d="M8 52c14-6 24-16 30-30M24 42c-6-6-10-12-11-20M32 30c6-4 12-6 20-5M28 26c-2-8 0-14 4-18" fill="none" stroke="{WOOD_D}" stroke-width="4" stroke-linecap="round"/>
<path d="M13 22c-6-4-8-10-6-16 6 2 9 8 6 16z" fill="{GREEN}"/>
<path d="M42 30c0-8 4-13 11-15 1 8-3 14-11 15z" fill="{GREEN}"/>
<path d="M34 8c-6-4-8-10-6-16 6 2 9 8 6 16z" fill="{GREEN}" transform="translate(0 8)"/>
<circle cx="20" cy="46" r="2.4" fill="{CORAL}"/>
'''

E['thaw'] = f'''
<circle cx="44" cy="18" r="9" fill="{ORANGE}"/>
<g stroke="{ORANGE}" stroke-width="2" stroke-linecap="round"><path d="M44 4v4M44 28v4M30 18h4M54 18h4"/></g>
<path d="M10 44c6-4 12-4 18 0s12 4 18 0 8-3 8-3v14H10z" fill="#BFDDE8"/>
<path d="M12 40l6-8 5 6 6-9 6 7 5-5 4 9" fill="{WHITE}" stroke="{BLUE}" stroke-width="1.6"/>
<path d="M20 48c2 2 4 2 6 0M34 48c2 2 4 2 6 0M44 50c2 2 4 2 6 0" stroke="{BLUE}" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M14 54h36" stroke="{BLUE}" stroke-width="2" stroke-linecap="round" opacity=".5"/>
'''

E['staircase'] = f'''
<path d="M8 56V44h12V32h12V20h12V8h12v48z" fill="#D9CDBB"/>
<path d="M8 44h12M20 32h12M32 20h12M44 8h12" stroke="#B7A890" stroke-width="2"/>
<path d="M14 44v-8M26 32v-8M38 20v-8" stroke="{WOOD_D}" stroke-width="3" stroke-linecap="round"/>
<path d="M10 38l26-24M13 41l26-24" stroke="{WOOD_D}" stroke-width="2.6" stroke-linecap="round"/>
<path d="M8 56h48" stroke="#B7A890" stroke-width="3"/>
'''

E['windowsill'] = f'''
<rect x="9" y="8" width="46" height="38" rx="3" fill="#EAF3F8" stroke="{INK}" stroke-opacity=".16" stroke-width="2"/>
<rect x="13" y="12" width="38" height="30" fill="#BFDDE8"/>
<path d="M32 12v30M13 27h38" stroke="{WHITE}" stroke-width="3"/>
<rect x="9" y="8" width="46" height="38" rx="3" fill="none" stroke="{WOOD}" stroke-width="4"/>
<rect x="5" y="46" width="54" height="6" rx="2" fill="{WOOD}"/>
<path d="M40 46c0-4 2-7 5-8M45 46v-6" stroke="{GREEN_D}" stroke-width="2" stroke-linecap="round"/>
<path d="M38 40c-3-1-4-3-4-6 3 0 5 2 5 5z" fill="{GREEN}"/>
<path d="M48 40c3-1 4-3 4-6-3 0-5 2-5 5z" fill="{GREEN}"/>
'''

E['screwdriver'] = f'''
<path d="M26 8h12v22H26z" fill="{CORAL}"/>
<rect x="24" y="8" width="16" height="8" rx="3" fill="#D8614F"/>
<path d="M28 30h8v8h-8z" fill="{STEEL}"/>
<path d="M30 38h4v18h-4z" fill="{GREY}"/>
<path d="M30 52h4l-2 4z" fill="{STEEL_D}"/>
<path d="M28 14h8" stroke="{WHITE}" stroke-width="2" opacity=".5" stroke-linecap="round"/>
<path d="M28 22h8" stroke="{WHITE}" stroke-width="2" opacity=".5" stroke-linecap="round"/>
'''

E['saw'] = f'''
<path d="M8 20h38l10 10-10 10H8z" fill="{STEEL}"/>
<path d="M8 38l4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4" fill="none" stroke="{STEEL_D}" stroke-width="2"/>
<path d="M8 20h38" stroke="{STEEL_D}" stroke-width="2"/>
<path d="M46 20c4 6 6 12 6 20" fill="none" stroke="{WOOD_D}" stroke-width="6" stroke-linecap="round"/>
<circle cx="18" cy="28" r="2" fill="{INK}" opacity=".3"/>
<circle cx="26" cy="28" r="2" fill="{INK}" opacity=".3"/>
'''

E['caulk'] = f'''
<path d="M12 26h26v12H12z" fill="{STEEL}"/>
<path d="M38 28h12v8H38z" fill="{STEEL_D}"/>
<path d="M50 30h6v4h-6z" fill="#B0BAB4"/>
<path d="M12 38h8v14h-8z" fill="#5E6B76"/>
<path d="M20 34h10v6H20z" fill="{ORANGE}" opacity=".85"/>
<path d="M8 26h4v12H8z" fill="#5E6B76"/>
<path d="M56 28c4 1 4 9 0 10z" fill="{CREAM}"/>
<circle cx="32" cy="32" r="2" fill="{INK}" opacity=".3"/>
'''

E['dash'] = f'''
<ellipse cx="30" cy="50" rx="18" ry="6" fill="{WHITE}" stroke="#C9C2B5" stroke-width="1.6"/>
<path d="M22 46c2-6 6-9 10-9s8 3 10 9z" fill="{WHITE}" stroke="#C9C2B5" stroke-width="1.6"/>
<g fill="{WHITE}" stroke="#C9C2B5" stroke-width="1"><circle cx="32" cy="36" r="2"/><circle cx="26" cy="40" r="2"/><circle cx="38" cy="40" r="2"/><circle cx="30" cy="43" r="2"/><circle cx="36" cy="44" r="2"/></g>
<path d="M44 14c4 4 6 8 6 12" stroke="{STEEL_D}" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M50 10v6M56 14h-6" stroke="{STEEL_D}" stroke-width="2" stroke-linecap="round"/>
'''

E['writing'] = f'''
<rect x="10" y="10" width="44" height="44" rx="3" fill="{CREAM}" stroke="{INK}" stroke-opacity=".14" stroke-width="2"/>
<g stroke="#C9C2B5" stroke-width="2" stroke-linecap="round"><path d="M18 18h20M18 24h28M18 30h24M18 36h28M18 42h18"/></g>
<path d="M40 52l4-14 10-10 6 6-10 10z" fill="{ORANGE}"/>
<path d="M54 28l6 6 3-3a4 4 0 0 0-6-6z" fill="{CORAL}"/>
<path d="M44 38l6 6" stroke="#C9812F" stroke-width="1.6"/>
'''

E['drawing'] = f'''
<rect x="8" y="14" width="48" height="36" rx="3" fill="{WHITE}" stroke="{WOOD}" stroke-width="3"/>
<rect x="8" y="14" width="10" height="36" fill="{WOOD_D}" opacity=".35"/>
<path d="M24 40l6-12 6 8 4-5 8 9z" fill="{GREEN}" opacity=".7"/>
<circle cx="42" cy="24" r="4" fill="{ORANGE}"/>
<path d="M22 44h26" stroke="#C9C2B5" stroke-width="2"/>
<path d="M40 56l6-12 4 2-5 12z" fill="{CORAL}"/>
'''

E['painting'] = f'''
<path d="M14 54l4-14 22-22 6 6-22 22z" fill="{WOOD}"/>
<path d="M40 24l6 6 6-6-6-6z" fill="#F2C14E"/>
<rect x="8" y="14" width="26" height="20" rx="2" fill="{WHITE}" stroke="{WOOD_D}" stroke-width="2"/>
<circle cx="16" cy="22" r="3" fill="{CORAL}"/>
<path d="M10 32l7-7 5 5 4-4 6 6z" fill="{BLUE}" opacity=".7"/>
<path d="M48 40c-4 0-6 3-6 6s2 5 5 5c3 0 4-2 7-2 2 0 3 1 3 3 0 2-2 4-5 4" fill="none" stroke="{STEEL_D}" stroke-width="2"/>
'''

E['dining-room'] = f'''
<rect x="8" y="26" width="48" height="7" rx="3" fill="{WOOD}"/>
<rect x="13" y="33" width="5" height="21" rx="2" fill="{WOOD_D}"/>
<rect x="46" y="33" width="5" height="21" rx="2" fill="{WOOD_D}"/>
<ellipse cx="32" cy="26" rx="20" ry="5" fill="{WOOD}"/>
<ellipse cx="32" cy="25" rx="14" ry="3.4" fill="{WHITE}"/>
<circle cx="32" cy="25" r="2.4" fill="{ORANGE}"/>
<path d="M4 20v14h8V20zM52 20v14h8V20z" fill="{CORAL}" opacity=".85"/>
<path d="M4 20v14M52 20v14" stroke="{WOOD_D}" stroke-width="2"/>
'''

E['beginning-of-spring'] = f'''
<path d="M32 56V30" stroke="{GREEN_D}" stroke-width="3" stroke-linecap="round"/>
<path d="M32 34c-8 0-13-5-13-12 8 0 13 4 13 12z" fill="{GREEN}"/>
<path d="M32 30c8 0 13-5 13-12-8 0-13 4-13 12z" fill="#A9D386"/>
<path d="M24 14c0-4 2-7 4-8 2 3 2 6 0 9-2 2-4 1-4-1z" fill="{WHITE}" stroke="{BLUE}" stroke-width="1.4"/>
<path d="M40 18c0-4 2-6 4-7 1 3 0 6-2 8-2 1-2 0-2-1z" fill="{WHITE}" stroke="{BLUE}" stroke-width="1.4"/>
<path d="M14 52c6-3 12-3 18 0s12 3 18 0" stroke="{BLUE}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".6"/>
'''

E['spring-equinox'] = f'''
<circle cx="32" cy="26" r="12" fill="{ORANGE}"/>
<g stroke="{ORANGE}" stroke-width="2.2" stroke-linecap="round"><path d="M32 8v5M32 39v5M14 26h5M45 26h5M19 13l3 3M42 36l3 3M45 13l-3 3M22 36l-3 3"/></g>
<path d="M18 52c4-6 9-9 14-9s10 3 14 9z" fill="{GREEN}"/>
<path d="M32 44v10M26 50v6M38 50v6" stroke="{GREEN_D}" stroke-width="2" stroke-linecap="round"/>
<circle cx="24" cy="46" r="3" fill="#E9A0B8"/><circle cx="40" cy="46" r="3" fill="#E9A0B8"/>
'''

E['beginning-of-summer'] = f'''
<circle cx="44" cy="18" r="9" fill="{ORANGE}"/>
<g stroke="{ORANGE}" stroke-width="2" stroke-linecap="round"><path d="M44 4v4M44 28v4M30 18h4M54 18h4"/></g>
<path d="M6 54c4-8 10-12 18-12h20c6 0 10 4 12 12z" fill="#F2D9A0"/>
<path d="M6 54c4-6 9-9 15-9h22c6 0 11 3 15 9z" fill="#E8C27A"/>
<path d="M20 8v26" stroke="{WOOD_D}" stroke-width="3"/>
<path d="M20 8c8 0 14 5 16 12-8 2-14-1-16-6zM20 8c-8 0-14 5-16 12 8 2 14-1 16-6z" fill="{CORAL}"/>
<circle cx="46" cy="48" r="6" fill="{BLUE}" opacity=".5"/>
'''

E['minor-heat'] = f'''
<circle cx="30" cy="26" r="12" fill="{ORANGE}"/>
<g stroke="{ORANGE}" stroke-width="2.2" stroke-linecap="round"><path d="M30 8v5M30 39v5M12 26h5M43 26h5"/></g>
<path d="M8 52c4-6 9-9 15-9h22c6 0 11 3 15 9z" fill="{GREEN}" opacity=".8"/>
<path d="M14 54c2-6 4-10 6-12M24 54c1-6 2-10 3-13M34 54c0-6 1-10 2-13" stroke="{GREEN_D}" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M48 36c2 3 3 6 3 9 0 3-2 5-4 5s-4-2-4-5c0-3 3-6 5-9z" fill="{BLUE}" opacity=".6"/>
'''

E['minor-cold'] = f'''
<g stroke="{BLUE}" stroke-width="2.4" stroke-linecap="round">
<path d="M30 10v28M20 15l20 18M40 15L20 33"/>
<path d="M30 10l-3 4M30 10l3 4M30 38l-3-4M30 38l3-4"/>
</g>
<path d="M42 44c0-4 4-7 8-7s8 3 8 7v10H42z" fill="{CORAL}"/>
<path d="M46 38v-4c0-3 2-4 4-4s4 1 4 4v4" fill="none" stroke="{CORAL}" stroke-width="3"/>
<path d="M42 46h16" stroke="#C95745" stroke-width="2" opacity=".6"/>
<circle cx="12" cy="44" r="2" fill="{WHITE}" stroke="{BLUE}" stroke-width="1.2"/>
<circle cx="20" cy="50" r="1.6" fill="{WHITE}" stroke="{BLUE}" stroke-width="1.2"/>
'''

E['harvest'] = f'''
<path d="M12 52c4-10 8-16 12-20M24 52c2-9 4-15 8-18M36 52c0-8 2-14 5-17" stroke="{GREEN_D}" stroke-width="3" fill="none" stroke-linecap="round"/>
<g fill="#E8A24D">
<ellipse cx="20" cy="24" rx="3.4" ry="5.4" transform="rotate(-30 20 24)"/><ellipse cx="26" cy="20" rx="3.4" ry="5.4" transform="rotate(30 26 20)"/>
<ellipse cx="34" cy="26" rx="3.4" ry="5.4" transform="rotate(-30 34 26)"/><ellipse cx="40" cy="22" rx="3.4" ry="5.4" transform="rotate(30 40 22)"/>
</g>
<ellipse cx="32" cy="52" rx="24" ry="5" fill="#C9A97A"/>
<circle cx="46" cy="46" r="7" fill="{ORANGE}"/>
<path d="M46 39v-4" stroke="{GREEN_D}" stroke-width="2"/>
'''

E['downpour'] = f'''
<path d="M14 22a8 8 0 0 1 8-8 10 10 0 0 1 19 3 7 7 0 0 1 0 14H22a8 8 0 0 1-8-9z" fill="#8A959E"/>
<path d="M14 22a8 8 0 0 1 8-8 10 10 0 0 1 19 3" fill="#A8B2BA"/>
<g stroke="{BLUE}" stroke-width="3" stroke-linecap="round">
<path d="M18 34l-3 10M27 34l-3 14M36 34l-3 10M45 34l-3 14M53 34l-3 9"/>
</g>
<ellipse cx="30" cy="54" rx="20" ry="4" fill="{BLUE}" opacity=".35"/>
<path d="M12 50c3 1 5 1 8 0M40 52c3 1 5 1 8 0" stroke="{BLUE}" stroke-width="2" stroke-linecap="round"/>
'''

E['shower-rain'] = f'''
<circle cx="24" cy="18" r="8" fill="{ORANGE}"/>
<path d="M26 26a7 7 0 0 1 7-7 9 9 0 0 1 17 3 6 6 0 0 1 0 12H34a7 7 0 0 1-8-8z" fill="#DCE7EE"/>
<g stroke="{BLUE}" stroke-width="2.6" stroke-linecap="round"><path d="M34 36l-2 8M43 36l-2 8M52 36l-2 8"/></g>
<path d="M10 50c6-3 12-3 18 0s12 3 18 0" stroke="{BLUE}" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round"/>
'''

E['typhoon'] = f'''
<path d="M32 32c-2-10 6-18 16-18 6 0 11 4 12 10-6-5-14-4-19 2-4 5-5 12-3 18-5-2-8-6-6-12z" fill="#4E9BD6"/>
<path d="M32 32c2 10-6 18-16 18-6 0-11-4-12-10 6 5 14 4 19-2 4-5 5-12 3-18 5 2 8 6 6 12z" fill="#7FC4E8"/>
<circle cx="32" cy="32" r="5" fill="#2F6B9E"/>
<path d="M32 27c3 0 5 2 5 5" stroke="{WHITE}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".7"/>
'''

E['fit'] = f'''
<path d="M10 30h44" stroke="#F2C14E" stroke-width="8" stroke-linecap="round"/>
<g stroke="#C99A2E" stroke-width="1.4"><path d="M18 26v8M24 26v8M30 26v8M36 26v8M42 26v8M48 26v8"/></g>
<path d="M12 42c0-4 3-6 7-6h26c4 0 7 2 7 6v8c0 4-3 6-7 6H19c-4 0-7-2-7-6z" fill="{CORAL}"/>
<path d="M26 36v20M38 36v20" stroke="#C95745" stroke-width="2" opacity=".6"/>
<circle cx="32" cy="46" r="2.4" fill="{WHITE}"/>
'''

E['check-up'] = f'''
<path d="M20 12v12a10 10 0 0 0 20 0V12" fill="none" stroke="{STEEL_D}" stroke-width="4" stroke-linecap="round"/>
<path d="M20 12h-4M40 12h4" stroke="{STEEL_D}" stroke-width="4" stroke-linecap="round"/>
<path d="M30 34v8c0 6 5 10 11 10s11-4 11-10" fill="none" stroke="{STEEL_D}" stroke-width="4" stroke-linecap="round"/>
<circle cx="52" cy="40" r="8" fill="#EFD3D3" stroke="{STEEL_D}" stroke-width="3"/>
<path d="M14 44c4-8 10-12 16-12s12 4 16 12z" fill="{CORAL}" opacity=".25"/>
<path d="M8 52h12" stroke="{STEEL_D}" stroke-width="3" stroke-linecap="round"/>
'''

E['salary'] = f'''
<rect x="10" y="12" width="34" height="42" rx="3" fill="{WHITE}" stroke="{INK}" stroke-opacity=".14" stroke-width="2"/>
<rect x="16" y="18" width="22" height="4" rx="2" fill="{STEEL_D}"/>
<g stroke="#C9C2B5" stroke-width="2" stroke-linecap="round"><path d="M16 28h22M16 34h22M16 40h14"/></g>
<circle cx="44" cy="44" r="10" fill="#F2C14E" stroke="#C9A227" stroke-width="2"/>
<text x="44" y="48" font-family="Segoe UI, sans-serif" font-size="11" font-weight="700" fill="#7A5A1A" text-anchor="middle">$</text>
<circle cx="48" cy="30" r="5" fill="#F6D06B" stroke="#C9A227" stroke-width="1.6"/>
'''

E['size'] = f'''
<path d="M14 16h28l8 8v24a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3z" fill="{WHITE}" stroke="{INK}" stroke-opacity=".14" stroke-width="2"/>
<path d="M42 16v8h8" fill="none" stroke="{STEEL_D}" stroke-width="2"/>
<circle cx="18" cy="22" r="2" fill="{STEEL_D}"/>
<g fill="{CORAL}" font-family="Segoe UI, sans-serif" font-size="9" font-weight="700">
<text x="24" y="34">S</text><text x="32" y="34">M</text><text x="40" y="34">L</text>
</g>
<path d="M20 44h20M20 50h14" stroke="#C9C2B5" stroke-width="2" stroke-linecap="round"/>
'''

E['sale'] = f'''
<path d="M12 12h20l20 20a4 4 0 0 1 0 6L38 52a4 4 0 0 1-6 0L12 32z" fill="{CORAL}"/>
<circle cx="22" cy="22" r="4" fill="{WHITE}"/>
<path d="M28 44l12-12" stroke="{WHITE}" stroke-width="3" stroke-linecap="round"/>
<circle cx="26" cy="40" r="2.6" fill="{WHITE}"/>
<circle cx="40" cy="26" r="2.6" fill="{WHITE}"/>
<path d="M40 12l4-4M46 16l5-2" stroke="#F6D06B" stroke-width="2.4" stroke-linecap="round"/>
'''

E['aisle'] = f'''
<path d="M8 20h48v6H8zM8 38h48v6H8z" fill="{STEEL}"/>
<g fill="{CORAL}"><rect x="12" y="26" width="7" height="12" rx="1.5"/><rect x="22" y="26" width="7" height="12" rx="1.5"/><rect x="32" y="26" width="7" height="12" rx="1.5"/><rect x="42" y="26" width="7" height="12" rx="1.5"/></g>
<g fill="{BLUE}"><rect x="12" y="44" width="7" height="12" rx="1.5"/><rect x="22" y="44" width="7" height="12" rx="1.5"/><rect x="32" y="44" width="7" height="12" rx="1.5"/><rect x="42" y="44" width="7" height="12" rx="1.5"/></g>
<path d="M8 56h48" stroke="{WOOD_D}" stroke-width="3"/>
<path d="M8 26h48" stroke="{STEEL_D}" stroke-width="1.6" opacity=".5"/>
'''

E['return'] = f'''
<rect x="10" y="24" width="34" height="26" rx="3" fill="{WOOD}"/>
<path d="M10 24l6-8h22l6 8z" fill="{WOOD_D}"/>
<path d="M22 24v8h10v-8" fill="none" stroke="{WOOD_D}" stroke-width="2"/>
<path d="M50 18c4 4 6 9 6 14" fill="none" stroke="{GREEN_D}" stroke-width="3" stroke-linecap="round"/>
<path d="M56 32l-4-4 7-2z" fill="{GREEN_D}"/>
<path d="M48 10c3 2 5 5 6 8" fill="none" stroke="{GREEN_D}" stroke-width="3" stroke-linecap="round"/>
'''

E['platform'] = f'''
<rect x="6" y="34" width="52" height="8" rx="2" fill="{STEEL}"/>
<path d="M6 42h52" stroke="{STEEL_D}" stroke-width="2"/>
<rect x="14" y="18" width="36" height="10" rx="2" fill="{BLUE}"/>
<path d="M18 28v6M46 28v6" stroke="{STEEL_D}" stroke-width="3"/>
<path d="M14 50l4-8M50 50l-4-8" stroke="{STEEL_D}" stroke-width="2" stroke-linecap="round"/>
<circle cx="20" cy="22" r="2" fill="{WHITE}"/><circle cx="28" cy="22" r="2" fill="{WHITE}"/><circle cx="36" cy="22" r="2" fill="{WHITE}"/>
<rect x="44" y="20" width="4" height="6" fill="{WHITE}"/>
'''

E['manager'] = f'''
<circle cx="30" cy="16" r="7" fill="#F2C7A0"/>
<path d="M20 30c0-4 4-7 10-7s10 3 10 7v18H20z" fill="#55616F"/>
<path d="M30 23l-3 5 3 4 3-4z" fill="{WHITE}"/>
<path d="M22 48h16v8H22z" fill="#3F4852"/>
<rect x="44" y="36" width="14" height="16" rx="2" fill="{WOOD}"/>
<path d="M44 40h14" stroke="{WOOD_D}" stroke-width="2"/>
<path d="M48 36v-4a3 3 0 0 1 6 0v4" fill="none" stroke="{WOOD_D}" stroke-width="2"/>
<path d="M22 30l8 8" stroke="#F2C7A0" stroke-width="3" stroke-linecap="round"/>
'''

E['clog'] = f'''
<path d="M8 26h28v12H8z" fill="{STEEL}"/>
<rect x="36" y="24" width="8" height="16" rx="2" fill="{STEEL_D}"/>
<path d="M44 32h8" stroke="{STEEL_D}" stroke-width="7" stroke-linecap="round"/>
<g fill="#7A5236">
<circle cx="48" cy="32" r="5"/><circle cx="41" cy="32" r="4"/><circle cx="35" cy="32" r="3"/>
</g>
<path d="M8 44c8-4 16-4 24 0" stroke="{BLUE}" stroke-width="2" fill="none" opacity=".5"/>
<path d="M46 14l4 10M54 12l-2 10" stroke="{CORAL}" stroke-width="2.4" stroke-linecap="round"/>
'''

E['tighten'] = f'''
<circle cx="30" cy="30" r="14" fill="none" stroke="{STEEL_D}" stroke-width="6"/>
<circle cx="30" cy="30" r="14" fill="none" stroke="{STEEL}" stroke-width="3"/>
<path d="M30 16v6M44 30h-6M30 44v-6M16 30h6M40 20l-4 4M40 40l-4-4M20 40l4-4M20 20l4 4" stroke="{STEEL_D}" stroke-width="2.4" stroke-linecap="round"/>
<path d="M38 44l14 12" stroke="{CORAL}" stroke-width="5" stroke-linecap="round"/>
<path d="M36 42l6-6 10 10-6 6z" fill="{CORAL}"/>
'''

E['stamina'] = f'''
<rect x="12" y="18" width="34" height="30" rx="5" fill="{STEEL_D}"/>
<rect x="16" y="22" width="26" height="22" rx="3" fill="{GREEN}" opacity=".55"/>
<rect x="46" y="26" width="5" height="14" rx="2" fill="{STEEL_D}"/>
<path d="M30 22l-6 11h6l-3 10 9-13h-6z" fill="{ORANGE}"/>
<path d="M22 52c6-3 12-3 18 0" stroke="{GREEN_D}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<circle cx="54" cy="20" r="2" fill="{GREEN}"/>
'''

E['maintenance'] = f'''
<circle cx="24" cy="24" r="12" fill="none" stroke="{STEEL_D}" stroke-width="5"/>
<circle cx="24" cy="24" r="4" fill="{STEEL_D}"/>
<path d="M33 33l14 14" stroke="{STEEL_D}" stroke-width="5" stroke-linecap="round"/>
<path d="M44 40l8-8 6 6-8 8z" fill="{CORAL}"/>
<circle cx="48" cy="16" r="6" fill="{WOOD_D}"/>
<path d="M45 16h6M48 13v6" stroke="{WOOD}" stroke-width="2" stroke-linecap="round"/>
<circle cx="12" cy="48" r="6" fill="{ORANGE}"/>
<circle cx="12" cy="48" r="2.4" fill="{WHITE}"/>
'''

E['lately'] = f'''
<rect x="8" y="12" width="40" height="42" rx="4" fill="{WHITE}" stroke="{INK}" stroke-opacity=".14" stroke-width="2"/>
<rect x="8" y="12" width="40" height="10" rx="4" fill="{STEEL_D}"/>
<g stroke="#C9C2B5" stroke-width="1.6"><path d="M14 32h28M14 38h28M14 44h20M22 26v24M32 26v24M42 26v24"/></g>
<circle cx="50" cy="44" r="9" fill="{WHITE}" stroke="{CORAL}" stroke-width="2.4"/>
<path d="M50 39v5l4 3" stroke="{CORAL}" stroke-width="2" fill="none" stroke-linecap="round"/>
'''

E['late'] = f'''
<circle cx="30" cy="30" r="20" fill="{WHITE}" stroke="{CORAL}" stroke-width="4"/>
<path d="M30 16v14l9 6" stroke="{INK}" stroke-width="3" fill="none" stroke-linecap="round"/>
<g fill="{CORAL}"><circle cx="30" cy="14" r="2"/><circle cx="46" cy="30" r="2"/><circle cx="30" cy="46" r="2"/><circle cx="14" cy="30" r="2"/></g>
<path d="M48 46c4 2 6 5 6 9" stroke="{CORAL}" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M54 54l-3-1 1-3z" fill="{CORAL}"/>
'''

E['epoch'] = f'''
<path d="M8 34h48" stroke="{STEEL_D}" stroke-width="3"/>
<g fill="{ORANGE}"><circle cx="14" cy="34" r="4"/><circle cx="28" cy="34" r="4"/><circle cx="42" cy="34" r="4"/><circle cx="54" cy="34" r="4"/></g>
<path d="M14 30V20M28 30V14M42 30V22M54 30V18" stroke="{STEEL_D}" stroke-width="2"/>
<g fill="{WOOD}">
<rect x="8" y="14" width="12" height="5" rx="1.5"/><rect x="22" y="8" width="12" height="5" rx="1.5"/><rect x="36" y="16" width="12" height="5" rx="1.5"/><rect x="48" y="12" width="10" height="5" rx="1.5"/>
</g>
<path d="M8 42c8 4 16 4 24 0s16-4 24 0" stroke="{BLUE}" stroke-width="2" fill="none" opacity=".5"/>
'''

E['roughly'] = f'''
<rect x="8" y="20" width="48" height="26" rx="4" fill="{WHITE}" stroke="{INK}" stroke-opacity=".12" stroke-width="2"/>
<text x="32" y="41" font-family="Segoe UI, sans-serif" font-size="22" font-weight="700" fill="{CORAL}" text-anchor="middle">≈</text>
<circle cx="14" cy="54" r="2" fill="{STEEL_D}"/><circle cx="26" cy="56" r="1.6" fill="{STEEL_D}"/><circle cx="38" cy="54" r="2" fill="{STEEL_D}"/>
'''

E['warm-up'] = f'''
<circle cx="22" cy="14" r="6" fill="#F2C7A0"/>
<path d="M16 26c0-3 3-5 6-5s6 2 6 5l2 12H14z" fill="{CORAL}"/>
<path d="M18 38l-3 14M26 38l4 12M28 26l10-4M14 28l-8-2" stroke="{CORAL}" stroke-width="4" stroke-linecap="round" fill="none"/>
<path d="M38 22l6-6M46 26l8-2M44 34h8" stroke="{ORANGE}" stroke-width="3" stroke-linecap="round"/>
<path d="M50 42c2 4 2 8 0 12" stroke="{GREEN_D}" stroke-width="2" stroke-linecap="round"/>
<path d="M42 50c4-4 8-4 12 0" stroke="{GREEN_D}" stroke-width="2" fill="none" stroke-linecap="round"/>
'''

E['competition'] = f'''
<circle cx="32" cy="22" r="12" fill="#F2C14E" stroke="#C9A227" stroke-width="2"/>
<path d="M32 15l2.4 5 5.6.6-4 4 1 5.4-5-2.8-5 2.8 1-5.4-4-4 5.6-.6z" fill="#F6D06B"/>
<path d="M26 32l-4 12M38 32l4 12" stroke="{CORAL}" stroke-width="4" stroke-linecap="round"/>
<path d="M18 52h28v4H18z" fill="{WOOD_D}"/>
<path d="M22 44h20v6H22z" fill="{WOOD}"/>
<path d="M10 22h6M48 22h6" stroke="{CORAL}" stroke-width="2" stroke-linecap="round"/>
'''

E['tradition'] = f'''
<rect x="16" y="12" width="32" height="40" rx="2" fill="#F4E3C3" stroke="{WOOD_D}" stroke-width="2"/>
<path d="M16 12l16-6 16 6z" fill="{CORAL}"/>
<path d="M22 20h20M22 26h20M22 32h14" stroke="#C9A97A" stroke-width="2" stroke-linecap="round"/>
<circle cx="32" cy="42" r="6" fill="{CORAL}"/>
<path d="M32 48v6M26 54h12" stroke="{WOOD_D}" stroke-width="2"/>
<path d="M10 16c3 0 4 3 3 5M54 16c-3 0-4 3-3 5" stroke="{ORANGE}" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M8 24c4 2 6 6 6 10M56 24c-4 2-6 6-6 10" stroke="#E8A24D" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
'''

E['jogging'] = f'''
<circle cx="34" cy="12" r="5.6" fill="#F2C7A0"/>
<path d="M30 20c-3 0-5 2-5 5l1 8 6 2 3-8" fill="{BLUE}"/>
<path d="M31 24l-7 7M35 24l7 6" stroke="#F2C7A0" stroke-width="4" stroke-linecap="round"/>
<path d="M30 34l-7 10 4 8M33 35l6 9 8 2" stroke="#3F5875" stroke-width="5" stroke-linecap="round" fill="none"/>
<path d="M38 34c2-4 6-5 9-3" stroke="{CORAL}" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M10 54h44" stroke="{STEEL_D}" stroke-width="2" stroke-linecap="round"/>
<path d="M44 18l6-4M50 24l7-2" stroke="{ORANGE}" stroke-width="2" stroke-linecap="round"/>
'''

def write_all():
    os.makedirs(OUT, exist_ok=True)
    svg_open = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">'
    for name, inner in E.items():
        with open(os.path.join(OUT, name + '.svg'), 'w', encoding='utf-8', newline='\n') as f:
            f.write(svg_open + inner.strip() + '</svg>\n')
    print('wrote', len(E), 'extra icons')


if __name__ == '__main__':
    write_all()