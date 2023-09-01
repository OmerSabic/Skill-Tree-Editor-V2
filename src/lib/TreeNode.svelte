<script>
  import { treeData, contextMenuCoords, contextNode } from "./store.js";
  export let node;

  let childNodes = $treeData.filter((item) => item.requires[0] === node._id);

  function openContextMenu(e) {
    contextMenuCoords.set({
      x: e.clientX,
      y: e.clientY,
    });

    contextNode.set(node);
  }
</script>

<li data-id={node._id} class="node">
  <a
    href="#"
    class="node"
    on:contextmenu|stopPropagation|preventDefault|nonpassive={openContextMenu}
    >{node.title || node.name}
    {node.level || ""}
    <p class="node-type">{node.type}</p></a
  >
  {#if childNodes.length > 0}
    <ul class="children">
      {#each childNodes as childNode}
        <svelte:self node={childNode} />
      {/each}
    </ul>
  {/if}
</li>

<style>
  .node-type {
    font-size: 11px;
    text-align: left;
    margin: 4px 0;
    color: var(--light-gray);
  }
</style>
