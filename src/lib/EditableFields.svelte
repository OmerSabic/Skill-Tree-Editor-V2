<script>
  import EditableArray from "./EditableArray.svelte";
  export const shouldEmpty = false;
  export let data = {};
  const DISABLED_FIELDS = ["_id"];
  const HIDDEN_FIELDS = ["__v", "type"];
  const disabled = (key) => DISABLED_FIELDS.includes(key);
</script>

{#each Object.keys(data) as key}
  {#if !HIDDEN_FIELDS.includes(key)}
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
      {:else if data[key] === null}
        <input type="text" bind:value={data[key]} disabled={disabled(key)} placeholder="Value is null. Assuming string." />
      {:else if Array.isArray(data[key])}
        <EditableArray bind:value={data[key]} keepFirst={key === "requires"} />
      {:else}
        <p>Unsupported data type for key: {key}</p>
      {/if}
    </div>
  {/if}
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
