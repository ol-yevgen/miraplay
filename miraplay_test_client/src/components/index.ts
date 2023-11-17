import { lazy } from "react";

// Layout
export const Header = lazy(() => import('components/Layout/Header/Header'));
export const Footer = lazy(() => import('components/Layout/Footer/Footer'));

// ProfileForms 
export const CreateNickName = lazy(() => import('components/Component/ProfileForms/CreateNickName'));
export const UpdateEmail = lazy(() => import('components/Component/ProfileForms/UpdateEmail'));

// Components
export { default as Search } from 'components/Component/Search/Search'
export { default as User } from 'components/Component/User/User'
export { default as Filters } from 'components/Component/Filters/Filters/Filters'
export const MobileFilters = lazy(() => import('components/Component/Filters/MobileFilters/MobileFilters'));

// UI
export { default as Input } from 'components/UI/Input/Input'
export { default as SubmitButton } from 'components/UI/Button/SubmitButton'
export { default as FilterButton } from 'components/UI/Button/FilterButton'
export { default as Spinner } from 'components/UI/Spinner/Spinner'
export { default as Logo } from 'components/UI/Logo/Logo'
