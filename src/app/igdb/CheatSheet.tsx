export default function CheatSheet() {
  return (
    <div>
      <div>Cheat sheet</div>
      <pre className="text-xs p-2 rounded border h-48 overflow-y-scroll">
        {`Basic Queries

Get games: fields name; limit 10;
Get specific game: fields *; where id = 1942;
Exclude fields: fields *; exclude alternative_name;

Search & Filtering

Search games: search "Halo"; fields name,release_date.human;
Exclude editions: search "Assassins Creed"; where version_parent = null;
Multi-endpoint search: Use /search endpoint with fields *; search "query"; limit 50;

Advanced Filters

Multiple IDs: fields *; where id = (8,9,11);
Rating filter: where rating &gt; 75;
Sort by field: fields name,rating; sort rating desc;

Platform Queries

Coming soon: fields *; where game.platforms = 48 & date &gt; [timestamp]; sort date asc;
Platform exclusives: fields name,category,platforms; where category = 0 & platforms = 48;
Multi-platform specific: fields name,category,platforms; where category = 0 & platforms = {48,6};

Game Versions

Get editions: fields game.name,games.name; where game = [game_id];
Get parent game: fields version_parent.*; where id = [version_id];`}
      </pre>
    </div>
  );
}
