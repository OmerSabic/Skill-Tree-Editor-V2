<script>
  import { treeData } from "./store.js";
  export let node;
  import { editingNode } from "./store.js";

  // treeData.set($treeData.filter(item => item._id !== node._id))

  let childNodes = $treeData.filter((item) => item.requires[0] === node._id);
</script>

<li data-id={node._id}>
  <a href="#" class="node" on:click={() => editingNode.set(node)}>{node.title || node.name} {node.level || ""} <p class="node-type">{node.type}</p></a
  >
  {#if childNodes.length > 0}
    <ul>
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
    color: var(--light-gray)
  }
</style>
