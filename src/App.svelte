<script>
  import { onMount } from "svelte";
  import Tree from "./lib/Tree.svelte";
  import {
    treeData,
    editingNode,
    pausePan,
    apiURL,
    apiKey,
    loading,
  } from "./lib/store";
  import { getFullTree } from "./lib/helpers/tree.helper";
  import EditorModal from "./lib/modals/EditorModal.svelte";
  import CredentialsModal from "./lib/modals/CredentialsModal.svelte";
  import { updateNode, deleteNode } from "./lib/helpers/api.helper";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
  let panzoomScreen;

  editingNode.subscribe((data) => {
    if (panzoomScreen) {
      pausePan.set(typeof data.empty == "undefined");
    }
  });

  async function updateController() {
    loading.set(true);
    let response = await updateNode($editingNode, $apiURL, $apiKey);
    if (response.ok) {
      loading.set(false);
      editingNode.set({ empty: true });
      toasts.success("Success!", "Successfuly updated node.");
    }
    else {
      toasts.error("Error!", "There was a problem with updating your node. Check the console.");
    }
  }

  async function deleteController() {
    loading.set(true);
    let response = await deleteNode($editingNode, $apiURL, $apiKey);
    if (response.ok) {
      treeData.set(tree => tree.filter(node => node._id !== $editingNode._id))
      loading.set(false);
      editingNode.set({ empty: true });
      toasts.success("Success!", "Successfuly deleted node.");
    }
    else {
      toasts.error("Error!", "There was a problem with deleting your node. Check the console.");
    }
  }

  onMount(async () => {
    if($treeData !== null) return;
    const unsubscribe = apiKey.subscribe(async (data) => {
      if (data !== null && $apiURL !== null) {
        loading.set(true)
        let tree = await getFullTree($apiURL, data);
        treeData.set(tree);
        loading.set(false)
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

<ToastContainer placement="top-right" let:data>
  <FlatToast {data} />
</ToastContainer>

<EditorModal>
  <div slot="controls" style="margin-top: 1rem; text-align: right">
    <button on:click={() => editingNode.set({ empty: true })}>Close</button>
    <button class="btn-red" on:click={deleteController}>Delete</button>
    <button class="btn-blue" on:click={updateController}>Update</button>
  </div>
</EditorModal>

<CredentialsModal />
