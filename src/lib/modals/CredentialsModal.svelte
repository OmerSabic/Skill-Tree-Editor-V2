<script>
  import { apiKey, apiURL } from "../store";
  import Modal from "./Modal.svelte";

  let showModal = true;

  let url = localStorage.getItem("apiURL");
  let key = localStorage.getItem("apiKey");

  function setCredentials() {
    apiURL.set(url);
    apiKey.set(key);

    localStorage.setItem("apiURL", url);
    localStorage.setItem("apiKey", key);

    showModal = false;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<Modal {showModal}>
  <div on:click|stopPropagation on:scroll|stopPropagation>
    <div>
      <div class="input-wrapper">
        <label for="api-input">API URL</label>
        <input type="text" id="api-input" bind:value={url} />
      </div>
      <div class="input-wrapper">
        <label for="key-input">API Key</label>
        <input type="text" id="key-input" bind:value={key} />
      </div>
    </div>
    <hr />
    <div style="margin-top: 1rem; text-align: right">
      <button on:click={setCredentials}>Set</button>
    </div>
  </div>
</Modal>

<style>
  .input-wrapper {
    margin: 1rem 0;
  }
</style>
