<!-- ContextMenu.svelte -->
<script>
  import { contextMenuCoords } from "./store.js";
  import { createModal, editorModal } from "./modals/modalStores.js";

  function closeContextMenu(e, instant = false) {
    if (instant || ["li", "window"].includes(e.target.localName))
      contextMenuCoords.set({ x: 0, y: 0 });
  }

  function createNode() {
    createModal.set(true);
    closeContextMenu(null, true);
  }

  function editNode() {
    editorModal.set(true);
    closeContextMenu(null, true);
  }
</script>

<svelte:window on:mousedown|stopPropagation={closeContextMenu} />

<div
  class="context-menu"
  style="left: {$contextMenuCoords.x}px; top: {$contextMenuCoords.y}px;"
>
  <ul>
    <li><a href="#" on:click|stopPropagation={createNode}>Create Child</a></li>
    <li><a href="#" on:click|stopPropagation={editNode}>Edit</a></li>
  </ul>
</div>

<style>
  .context-menu {
    position: absolute;
    background-color: var(--black);
    border: 2px solid var(--gray);
    border-radius: 5px;
    z-index: 1000;
    color: var(--white);
  }

  .context-menu ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .context-menu li {
    padding: 4px;
    padding: 6px;
    cursor: pointer;
  }

  .context-menu li:hover {
    background-color: var(--light-gray);
  }

  .context-menu li a {
    text-decoration: none;
    color: var(--white);
  }
</style>
