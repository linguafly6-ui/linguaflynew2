# PRE-A1 mission source import

The source of truth is the user-provided archive:
`Linguafly_Misiones_001-010_respuestas_mezcladas(1).zip`.

Do not import any other legacy course or Quest content.

## Required public paths

Extract each original HTML file unchanged to the following path:

| Mission | Archive HTML path | Destination |
|---|---|---|
| 001 | `Mision_001/linguafly-first-mission-demo/mission-001.html` | `public/quest/missions/001/mission-001.html` |
| 002 | `Mision_002/linguafly-mission002/mission-002.html` | `public/quest/missions/002/mission-002.html` |
| 003 | `Mision_003/mission-003.html` | `public/quest/missions/003/mission-003.html` |
| 004 | `Mision_004/mission-004.html` | `public/quest/missions/004/mission-004.html` |
| 005 | `Mision_005/linguafly-mission-005-build/mission-005.html` | `public/quest/missions/005/mission-005.html` |
| 006 | `Mision_006/linguafly-mission-006-my-little-house/mission-006.html` | `public/quest/missions/006/mission-006.html` |
| 007 | `Mision_007/mission-007.html` | `public/quest/missions/007/mission-007.html` |
| 008 | `Mision_008/mission-008.html` | `public/quest/missions/008/mission-008.html` |
| 009 | `Mision_009/mission-009.html` | `public/quest/missions/009/mission-009.html` |
| 010 | `Mision_010/mission-010.html` | `public/quest/missions/010/mission-010.html` |

## Local image assets

Copy these assets unchanged, preserving the relative `assets/` path used by the HTML:

- `Mision_001/linguafly-first-mission-demo/assets/forest.png` → `public/quest/missions/001/assets/forest.png`
- `Mision_002/linguafly-mission002/assets/kitchen.png` → `public/quest/missions/002/assets/kitchen.png`
- `Mision_003/assets/wardrobe.png` → `public/quest/missions/003/assets/wardrobe.png`
- `Mision_004/assets/to-be-park.png` → `public/quest/missions/004/assets/to-be-park.png`

Missions 005–010 have no separate local image files listed in the archive.

## Import validation

After copying, verify all ten HTML files and four PNGs exist, that each HTML is byte-for-byte identical to its archive entry, and that relative asset requests resolve. Run the project build and inspect each mission in a browser at desktop and mobile widths.

Do not edit mission questions, answers, translations, audio, activity order, styling, illustrations, or interaction logic during import.

## Progress storage

The isolated migration is `migrations/d1/20261110_pre_a1_mission_progress.sql`. It is intentionally not applied automatically. Apply it only after explicit production-change approval. No legacy Quest, XP, streak, achievement, adaptive-profile, leaderboard, or speaking-progress tables should be read or modified.
