import { Link } from 'react-router-dom'

const TopBar = () => {
  return (
    <div className="bg-primary text-white py-2 text-sm">
      <div className="container-fluid flex justify-between items-center">
        <div>
          Free Shipping on All Orders Over $75
        </div>
        <div className="flex items-center gap-4">
          <Link to="/my-account" className="text-white hover:underline">
            My Account
          </Link>
          <Link to="/wishlist" className="text-white hover:underline">
            Wishlist
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopBar
