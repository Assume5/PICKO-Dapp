import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RestaurantType } from '@src/types';
import { ContractContext } from '@src/contexts';
import Web3 from 'web3';

interface Props {
  restaurants: RestaurantType[];
  currentFilter: string[];
}
export const RestaurantList: React.FC<Props> = ({ restaurants, currentFilter }) => {
  const navigate = useNavigate();
  const contractCtx = useContext(ContractContext);
  const runExample = async () => {
    if (contractCtx.contract) {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();

      try {
        await contractCtx.contract.methods.set(5).send({ from: accounts[0] });
        const response = await contractCtx.contract.methods.get().call();
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onRestaurantCardClick = (key: string, id: string) => {
    const keyWithDash = key.trim().replaceAll(' ', '-').toLowerCase();
    navigate(`/restaurant/${keyWithDash}/${id}`);
  };

  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant) => {
        const key = restaurant.restaurant_name;
        const category = restaurant.category.split(', ');
        if (currentFilter.length === 0 || category.some((r) => currentFilter.indexOf(r) >= 0)) {
          return (
            <div
              className="restaurant-card"
              onClick={() => onRestaurantCardClick(key, restaurant.id)}
              key={restaurant.id}
              style={{ backgroundImage: `url(${restaurant.restaurant_card_image})` }}
            >
              <div className="corner"></div>
              <div className="corner"></div>
              <div className="corner"></div>
              <div className="corner"></div>
              <div className="restaurant-card-content">
                <div className="restaurant-card-name">
                  <h4>
                    {key} - {restaurant.full_address}
                  </h4>
                </div>
                <div className="restaurant-card-information">
                  <p>{restaurant.distance.toFixed(1)} mi</p>
                  <p>|</p>
                  <p>30 Mins</p>
                </div>
                <div className="restaurant-card-fee">
                  <p>Delivery Fee: $3</p>
                </div>
              </div>
              <div className="overlay"></div>
            </div>
          );
        }
      })}
      <div className="load-more">
        <button onClick={() => runExample()}>Load More</button>
      </div>
    </div>
  );
};
