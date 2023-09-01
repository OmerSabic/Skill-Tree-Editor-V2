<script>
  import panzoom from "panzoom";
  import { onMount } from "svelte";
  import { treeData, pausePan } from "./store.js";
  import TreeNode from "./TreeNode.svelte";

  let treeContainer;
  export let panzoomScreen;

  onMount(() => {
    panzoomScreen = panzoom(treeContainer, {
      bounds: true,
    });
  });

  $: {
    if (panzoomScreen) {
      if ($pausePan) {
        panzoomScreen.pause();
      } else {
        panzoomScreen.resume();
      }
    }
  }
</script>

<div class="tree" bind:this={treeContainer}>
  <ul class="children">
    {#each $treeData.filter((item) => item.requires.length === 0) as node}
      <TreeNode {node} />
    {/each}
  </ul>
</div>
