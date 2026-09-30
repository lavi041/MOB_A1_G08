# Musanze Safe Markets – Field Inspection Prototype (SWE 3409, Assignment 1)

React Native + Expo (TypeScript) app for the fictional Musanze Safe Markets inspection pilot.
No backend, no API keys, no real personal data.

## Group details (COMPLETE BEFORE SUBMITTING)

| Item | Value |
|---|---|
| Group number | G__ |
| Group verification code | MOB-G__-____ |
| Group leader | ______ (reg. no. ______) |
| GitHub repository | https://github.com/______ |
| Final commit hash | ______ |

| Role | Member (name / reg. no.) |
|---|---|
| Member 1 – Product and UX lead | |
| Member 2 – Interface engineer | |
| Member 3 – State and navigation engineer | |
| Member 4 – Device integration and QA lead | |
| Member 5 – Release and evidence lead (4-member group: Member 4) | |

## Set the group code (required)
Edit `src/config.ts`:
```ts
export const GROUP_NUMBER = 'G04';      // your group number
export const LEADER_REG_LAST4 = '1234'; // last 4 digits of leader's registration number
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

Tested environment: (fill in: OS, Node version, Expo Go version, Android version/device).

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
