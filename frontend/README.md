# Railway Controller Frontend

This Vite app currently focuses on the authentication flow for the railway control project.

## Structure

```text
src/
  App.tsx
  pages/
    LoginPage.tsx
    SignupPage.tsx
  components/
    auth/
      AuthPageShell.tsx
      AuthForm.tsx
      AuthStatusCard.tsx
    ui/
      button.tsx
      card.tsx
      input.tsx
      label.tsx
      select.tsx
      separator.tsx
  lib/
    api/
      graphql.ts
      auth.ts
    store/
      authSlice.ts
      authTypes.ts
      reduxHooks.ts
      store.ts
    utils.ts
```

## Auth Flow

1. Users open `/login` or `/signup`.
2. The form validates input with `zod`.
3. GraphQL requests are sent with Axios to the backend auth resolver.
4. The response is normalized and stored in Redux.
5. `react-hot-toast` shows the success or error state.
6. The page stays in place so the dashboard can be added later.

## Environment

- `VITE_GRAPHQL_URL` can point to a custom GraphQL endpoint.
- If it is not set, the app defaults to `http://localhost:3000/graphql`.
