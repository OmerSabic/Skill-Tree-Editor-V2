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
</script>

<div class="array-input">
  <div class="input-box">
    <input type="text" bind:value={newItem} />
    <button on:click={addItem}>Add</button>
  </div>
  <div class="item-list">
    {#each value as item, index}
      <div class="item">
        <span>{item}</span>
        {#if !keepFirst || index !== 0}
        <span
          class="delete-item"
          style="color: red; cursor:pointer;"
          on:click={() => removeItem(index)}>X</span
        >
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
</style>
