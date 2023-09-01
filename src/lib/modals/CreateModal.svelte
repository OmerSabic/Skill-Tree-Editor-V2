<script>
  import EditableFields from "../EditableFields.svelte";
  import { contextNode } from "../store";
  import {createModal} from './modalStores.js'
  import Modal from "./Modal.svelte";
  import { applyTemplate } from "../helpers/tree.helper";
  import {
    skillTemplate,
    itemTemplate,
    challengeTemplate,
  } from "../templates.js";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<Modal bind:showModal={$createModal}>
  <div on:click|stopPropagation on:scroll|stopPropagation>
    <EditableFields data={applyTemplate($skillTemplate, {})} />
    <hr />
    <div class="controls">
      <button on:click={() => createModal.set(false)}>Close</button>
    </div>
  </div>
</Modal>
