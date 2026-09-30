# Musanze Safe Markets – Field Inspection Prototype (SWE 3409, Assignment 1)

React Native + Expo (TypeScript) app for the fictional Musanze Safe Markets inspection pilot.
No backend, no API keys, no real personal data.

## Group details (COMPLETE BEFORE SUBMITTING)

| Item | Value |
|---|---|
| Group number | G08 |
| Group verification code | MOB-G08-7104 |
| Group leader | NiYonsaba Aisha (reg. no. 25/27104) |
| GitHub repository | https://github.com/lavi041/MOB_A1_G08 |
| Final commit hash | To be updated |

| Role | Member (name / reg. no.) |
|---|---|
| Member 1 – Product and UX lead | NiYonsaba Aisha / 25/27104 |
| Member 2 – Interface engineer | Inezaye Iwacu Adelphine / 25/27123 |
| Member 3 – State and navigation engineer | Manzi Kassim / 25/27935 |
| Member 4 – Device integration and QA lead | Mahgoub Adil Ahmed Alhassan / 25/28013 |
| Member 5 – Release and evidence lead | Ishimwe Sumaya / 25/27949 |

## Set the group code (required)
Edit `src/config.ts`:
```ts
export const GROUP_NUMBER = 'G08';      // your group number
export const LEADER_REG_LAST4 = '7104'; // last 4 digits of leader's registration number
```
The code `MOB-GXX-LLLL` is then shown in the header of every tab and on the review screen.

## Install and run
Requirements: Node.js 20 LTS or newer, npm, and the **Expo Go** app on an Android phone (same Wi-Fi as the computer).

```bash
npm install
npx expo install --check    # optional: confirms package versions match your Expo Go SDK
npx expo start
```
Scan the QR code with Expo Go. If the network blocks it, use `npx expo start --tunnel`.
Type check: `npm run typecheck`.

Tested environment: Ubuntu Linux, Node.js v22.22.1, Expo Go, Android, Samsung A05.

## Features → files
| Requirement | Files |
|---|---|
| Market catalog (8 zones, cards, chips, empty state) | `src/screens/HomeScreen.tsx`, `src/components/ZoneCard.tsx`, `StatusChip.tsx`, `PriorityBadge.tsx`, `EmptyState.tsx`, `src/data/zones.ts` |
| Inspection form + validation | `src/screens/InspectionFormScreen.tsx`, `src/utils/validation.ts`, `TextField.tsx`, `ChoiceGroup.tsx`, `ConsentCheckbox.tsx` |
| Navigation (tabs + stacks, typed params) | `src/navigation/*` |
| Camera / gallery workflow | `src/components/ImagePickerField.tsx` |
| Review + save (in-memory) | `src/screens/ReviewScreen.tsx`, `src/context/InspectionContext.tsx` |
| Records + details | `src/screens/RecordsScreen.tsx`, `RecordDetailsScreen.tsx` |

## Validation rules
- Vendor alias: required, 3–24 characters.
- Stall code: exactly `^MSM-[A-D]\d{2}$` (e.g. `MSM-A01`, case-sensitive).
- Contact: `^(\+250|0)7[2389]\d{7}$` after removing spaces/dashes (e.g. `0788 000 123`, `+250 788 000 123`).
- Category and risk level: one option must be chosen.
- Consent: must be ticked.
- Submission is blocked until every rule passes; each field shows its own message.

## Navigation map
- Tabs: `Home` · `NewInspection` (stack: `InspectionForm` → `Review`) · `Records` (stack: `RecordsList` → `RecordDetails { recordId }`).
- Form draft, pending review and saved records live in `InspectionContext`, above the navigators, so tab switches and back navigation keep the session.

## Testing the camera/gallery workflow
1. Tap **Take photo** → deny permission → an explanation and recovery options appear.
2. Allow permission → capture → preview appears.
3. Cancel the camera/gallery → an info message says nothing changed.
4. Use **Replace** (camera or gallery) and **Remove photo**.

## Known limitations
- Records are in memory only and are cleared when the app reloads (by design).
- The evidence photo is optional; the review screen states when none is attached.
- (Add anything else your group finds.)
