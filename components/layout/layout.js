import MainNavigation from "./main-navigation";

export default function Layout(props) {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
      <p>This is Layout component</p>
    </>
  );
}
