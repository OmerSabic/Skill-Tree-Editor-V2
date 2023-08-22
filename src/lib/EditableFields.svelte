<script>
  import EditableArray from "./EditableArray.svelte";
  export let data = {};
  const HIDDEN_FIELDS = ["__v", "type", "_id"];
  const disabled = (key) => HIDDEN_FIELDS.includes(key);
</script>

{#each Object.keys(data) as key}
  <div class="field">
    <label>{key}</label>
    {#if typeof data[key] === "string"}
      <input type="text" bind:value={data[key]} disabled={disabled(key)} />
    {:else if typeof data[key] === "number"}
      <input type="number" bind:value={data[key]} disabled={disabled(key)} />
    {:else if typeof data[key] === "boolean"}
      <input
        type="checkbox"
        bind:checked={data[key]}
        disabled={disabled(key)}
      />
    {:else if Array.isArray(data[key])}
      <EditableArray bind:value={data[key]} keepFirst={(key === "requires")}/>
    {:else}
      <p>Unsupported data type for key: {key}</p>
    {/if}
  </div>
{/each}

<style>
  .field {
    margin-bottom: 10px;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 5px;
  }
</style>
