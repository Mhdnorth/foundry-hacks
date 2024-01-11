Hooks.on("ready", async () => {
  const actors = [...game.actors.values()].filter(actor => actor.ownership[game.user.id] === foundry.CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER);
  if (actors.length === 0) {
    console.log('[kabbi] No actors found for the current user');
    return;
  }
  if (actors.length > 1) {
    console.log('[kabbi] More then one actor for the current user');
    return;
  }

  const [actor] = actors;

  for (const scene of game.scenes.values()) {
    const tokens = [...scene.tokens.values()];
    const actorToken = tokens.find(token => token.actorId === actor.id);
    if (actorToken) {
      console.log("[kabbi] Switching to scene", scene.name, "for actor", actor.name);
      await scene.view()
      return;
    }
  }

  console.log("[kabbi] Found no scene / token combo for actor", actor.name);
});

