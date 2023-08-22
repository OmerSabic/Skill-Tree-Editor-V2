<script>
  import EditableFields from "../EditableFields.svelte";
  import { editingNode } from "../store";
  import Modal from "./Modal.svelte";
  let showModal = false;

  editingNode.subscribe((data) => {
    showModal = !Object.keys(data).includes("empty");
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<Modal bind:showModal>
  <div on:click|stopPropagation on:scroll|stopPropagation>
    <EditableFields data={$editingNode} />
    <hr />
    <slot name="controls" />
  </div>
</Modal>
