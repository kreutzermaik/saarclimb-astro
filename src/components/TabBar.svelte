<script>
    import NavItem from "./NavItem.svelte";

    const activeTabColor = "text-secondary";
    const inActiveTabColor = "text-light-text";
</script>

<header>
    <nav class="bg-dark-grey fixed bottom-0 z-10">
        <div class="grid grid-cols-4 w-screen gap-5 px-1 pt-1">
            <NavItem text="Dashboard" />
            <NavItem text="Planer" />
            <NavItem text="Fortschritt" />
            <NavItem text="Ranking" />
<!--            <button class={`flex items-center justify-center flex-col cursor-pointer p-2 text-light`}>
                <a href="/">
                    <p class={`inActiveTabColor} text-sm`}>Dashboard</p>
                </a>
            </button>-->
<!--            <button class={`flex items-center justify-center flex-col cursor-pointer p-2 text-light`}>
                <a href="/plan">
                    <p class={`inActiveTabColor} text-sm`}>Planer</p>
                </a>
            </button>
            <button class={`flex items-center justify-center flex-col cursor-pointer p-2 text-light`}>
                <a href="/progress">
                    <p class={`inActiveTabColor} text-sm`}>Fortschritt</p>
                </a>
            </button>
            <button class={`flex items-center justify-center flex-col cursor-pointer p-2 text-light`}>
                <a href="/board">
                    <p class={`inActiveTabColor} text-sm`}>Ranking</p>
                </a>
            </button>-->
        </div>
    </nav>
</header>
