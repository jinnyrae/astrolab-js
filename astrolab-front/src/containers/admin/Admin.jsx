import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <section className="Admin__section">
      <h2>Administration</h2>
      <div className="Admin__section-link">
        <Link to={'/admin/addProduct'}>Ajouter un produit</Link>
        <Link to={'/admin/action'}>Actions</Link>
        <Link to={'/admin/orderTable'}>Les Commandes</Link>
        <Link to={'/admin/userTable'}>Les Utilisateurs</Link>
      </div>
    </section>
  );
};
export default Admin;
