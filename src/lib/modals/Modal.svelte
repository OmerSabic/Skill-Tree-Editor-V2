<script>
	export let showModal; // boolean

	let dialog; // HTMLDialogElement

	$: {
    if (dialog) {
      if(showModal) {
        dialog.showModal();
      }
      else {
        dialog.close()
      }
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot />
	</div>
</dialog>

<style>
  dialog {
    max-width: 40em;
    width: 100%;
    border-radius: 0.2em;
    border: none;
    max-height: 30rem;
    padding: 2rem;
    margin: auto auto;
    border: 2px solid var(--light-gray);
    background: var(--black);
    color: var(--white);
    box-shadow: 0 0 #0000, 0 0 #0000, 0 25px 50px -12px rgba(0, 0, 0, 0.85);
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
