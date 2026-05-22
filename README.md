# Pokemon App Frontend

Modern Pokemon explorer built with Next.js App Router, React, TypeScript, Tailwind CSS, React Hook Form, and TanStack Query.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env
```

3. Run development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` - start dev server
- `npm run lint` - run ESLint
- `npm run build` - production build
- `npm run start` - start production server

## Environment Variables

- `NEXT_PUBLIC_POKEAPI_BASE_URL`  
  Base URL for Pokemon API. Default in example: `https://pokeapi.co/api/v2`
- `NEXT_PUBLIC_DEFAULT_PAGE_SIZE`  
  Page size used by Pokedex pagination.

## Project Structure

```text
src/
  app/
    collection/
      page.tsx              # favorites collection explorer
    pokedex/
      page.tsx              # list/search/pagination view
      [id]/page.tsx         # pokemon detail + favorites form
  shared/
    ui/
      PrimaryButton.tsx
      SecondaryButton.tsx
      TextLink.tsx
      SearchInput.tsx
      NewsCard.tsx
      PokemonSummaryCard.tsx
    providers/
      QueryProvider.tsx     # TanStack Query + persistence provider
  features/
    pokemon/
      api/pokemonApi.ts
      components/
        PokemonCard.tsx
        FavoritesForm.tsx
      hooks/
      mappers/
      types.ts
    favorites/
      hooks/useFavorites.ts
      schemas/favoriteFormSchema.ts
      types.ts
  lib/
    env.ts                  # typed env access
```

## API Usage Notes

Base API: `https://pokeapi.co/`

Endpoints used:

- `GET /pokemon?offset=<number>&limit=<number>` for list pagination
- `GET /pokemon/:id` for pokemon detail
- Pokemon detail URLs returned by list endpoint are also fetched to enrich list cards with image and types.

## Error Handling Approach

- Data fetching is wrapped in typed API functions that throw on non-OK response.
- UI shows explicit loading, error, and empty states for list and detail pages.
- Favorites persist in TanStack Query cache with localStorage persistence; app recovers state after reload.
- Favorites form uses `zod` + `react-hook-form` resolver for input validation.

## Current Behavior Notes

- Pokedex search is case-sensitive by project decision.
- Favorites can be reviewed from `/collection`.

## Performance Notes

- `next/image` is used for optimized image rendering.
- TanStack Query provides request caching and stale-time control.
- Pagination limits rendered data and network workload per view.
