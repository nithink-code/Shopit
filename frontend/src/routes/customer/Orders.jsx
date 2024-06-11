import NavBar2 from "../../components/NavBar2";

export default function Orders() {
  return (
    <>
      <NavBar2 login={true} customerRole={true} />
      <h1>Your Orders</h1>
    </>
  );
}
