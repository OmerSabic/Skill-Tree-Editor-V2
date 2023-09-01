<script>
  import { onMount } from "svelte";
  import Tree from "./lib/Tree.svelte";
  import {
    treeData,
    apiURL,
    apiKey,
    loading,
    contextMenuCoords,
  } from "./lib/store";
  import { getFullTree } from "./lib/helpers/tree.helper";
  import { ToastContainer, FlatToast } from "svelte-toasts";
  import ContextMenu from "./lib/ContextMenu.svelte";
    import ModalsContainer from "./lib/modals/ModalsContainer.svelte";
  let panzoomScreen;

  onMount(async () => {
    if ($treeData !== null) return;
    const unsubscribe = apiKey.subscribe(async (data) => {
      if (data !== null && $apiURL !== null) {
        loading.set(true);
        let tree = await getFullTree($apiURL, data);
        treeData.set(tree);
        loading.set(false);
        unsubscribe();
      }
    });
  });
</script>

{#key $treeData}
  {#if $treeData}
    <Tree bind:panzoomScreen />
  {/if}
{/key}

{#if $contextMenuCoords.x !== 0 && $contextMenuCoords.y !== 0}
  <ContextMenu />
{/if}

<ToastContainer placement="top-right" let:data>
  <FlatToast {data} />
</ToastContainer>

<ModalsContainer />