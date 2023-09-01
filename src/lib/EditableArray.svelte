<script>
  export let value = [];
  export let keepFirst = false;
  let newItem = "";

  function addItem() {
    if (newItem !== "") {
      value = [...value, newItem];
      newItem = "";
    }
  }

  function removeItem(index) {
    if (!keepFirst || index !== 0) {
      value = value.filter((_, i) => i !== index);
    }
  }

  let editIndex = -1;

  function startEditing(index) {
    editIndex = index;
  }

  function cancelEditing() {
    editIndex = -1;
  }

  function saveEditing(index) {
    editIndex = -1;
  }

  function moveItemDown(index) {
    const temp = value[index];
    value[index] = value[index + 1];
    value[index + 1] = temp;
    value = value;
  }
</script>

<div class="array-input">
  <div class="input-box">
    <input type="text" bind:value={newItem} />
    <button on:click={addItem}>Add</button>
  </div>
  <div class="item-list">
    {#if value.length === 0}
      <div class="item">
        <span style="opacity:0.7">Add a new value</span>
      </div>
    {/if}
    {#each value as item, index}
      <div class="item">
        {#if editIndex === index}
          <input type="text" bind:value={item} style="width: 100%;" />
          <button on:click={() => saveEditing(index)}>Save</button>
          <button on:click={cancelEditing}>Cancel</button>
        {:else}
          <span>{item}</span>

          {#if !keepFirst || index !== 0}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="editing-wrapper">
              {#if value.length - 1 !== index}
                <span
                  style="cursor:pointer;"
                  on:click={() => moveItemDown(index)}>V</span
                >
              {/if}
              <span
                class="delete-item"
                style="cursor:pointer;"
                on:click={() => startEditing(index)}>✍️</span
              >
              <span
                class="delete-item"
                style="color: red; cursor:pointer;"
                on:click={() => removeItem(index)}>X</span
              >
            </div>
          {/if}
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .delete-item {
    color: red;
    cursor: pointer;
  }

  .input-box input {
    border-radius: 6px 0px 0px 0px;
    margin: 0;
    height: 32px;
    width: 100%;
  }

  .input-box button {
    border-radius: 0px 6px 0px 0px;
  }

  .input-box {
    display: flex;
    justify-content: stretch;
    width: 100%;
  }

  .item-list {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .item-list .item {
    display: flex;
    justify-content: space-between;
    border: 1px #414141 solid;
    border-top-width: 0px;
    background-color: #1a1a1a;
    padding: 6px 8px;
  }

  .item-list .item:last-of-type {
    border-radius: 0px 0px 6px 6px;
  }

  .editing-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
  }
</style>
