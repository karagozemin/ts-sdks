# dapp-kit-react

React bindings for [`@mysten/dapp-kit-next`](https://github.com/MystenLabs/ts-sdks).

These components wrap the web components provided by dapp-kit-next using [`@lit/react`](https://lit.dev/docs/integrations/react/).

This package also re-exports everything from `@mysten/dapp-kit-next` so React
projects can import from a single entrypoint. The web component classes remain
available under their original `DAppKit*` names while the React wrappers are
exported as `ConnectButton` and `ConnectModal` to avoid conflicts.
