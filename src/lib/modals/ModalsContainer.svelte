<script>
  import EditorModal from "./EditorModal.svelte";
  import CredentialsModal from "./CredentialsModal.svelte";
  import { createModal, editorModal } from "./modalStores.js";
  import CreateModal from "./CreateModal.svelte";
  import { pausePan } from "../store";

  $: {
    pausePan.set($createModal || $editorModal);
  }
</script>

{#if $editorModal}
  <EditorModal />
{/if}

<CredentialsModal />

{#if $createModal}
  <CreateModal />
{/if}
