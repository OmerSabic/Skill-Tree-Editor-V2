<script>
  import EditableFields from "../EditableFields.svelte";
  import { apiKey, apiURL, contextNode, loading } from "../store.js";
  import { editorModal } from "./modalStores.js";
  import Modal from "./Modal.svelte";
  import { applyTemplate } from "../helpers/tree.helper";
  import {
    skillTemplate,
    itemTemplate,
    challengeTemplate,
  } from "../templates.js";
  import { updateNode } from "../helpers/api.helper";
  import { toasts } from "svelte-toasts";

  const typeToTemplate = {
    skill: $skillTemplate,
    item: $itemTemplate,
    challenge: $challengeTemplate,
  };

  async function updateController() {
    loading.set(true);
    let response = await updateNode($contextNode, $apiURL, $apiKey);
    if (response.ok) {
      loading.set(false);
      contextNode.set({});
      toasts.success("Success!", "Successfuly updated node.");
    } else {
      toasts.error(
        "Error!",
        "There was a problem with updating your node. Check the console."
      );
    }
  }

  let nodeData = {};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<Modal showModal={true}>
  <div on:click|stopPropagation on:scroll|stopPropagation>
    <EditableFields
      data={applyTemplate(typeToTemplate[$contextNode.type], $contextNode)}
    />
    <hr />
    <div style="margin-top: 1rem; text-align: right">
      <button on:click={() => editorModal.set(false)}>Close</button>
      <button class="btn-blue" on:click={updateController}>Update</button>
    </div>
  </div>
</Modal>
