const itActsAsRestaurantBookmarkModel = (restaurantBookmark) => {
    fit('should return the Restaurant that has been added', async () => {
      await restaurantBookmark.putRestaurant({ id: 1 });
      await restaurantBookmark.putRestaurant({ id: 2 });
  
      expect(await restaurantBookmark.getRestaurant(1))
        .toEqual({ id: 1 });
      expect(await restaurantBookmark.getRestaurant(2))
        .toEqual({ id: 2 });
      expect(await restaurantBookmark.getRestaurant(3))
        .toEqual(undefined);
    });
  
    fit('should refuse a Restaurant from being added if it does not have the correct property', async (done) => {
      restaurantBookmark.putRestaurant({ aProperty: 'property' });
      setTimeout(async () => {
        expect(await restaurantBookmark.getAllRestaurant())
        .toEqual([]);
        done();
      }, 700);
    });

    fit('can return all of the Restaurants that have been added', async (done) => {
      await restaurantBookmark.putRestaurant({ id: 1 });
      await restaurantBookmark.putRestaurant({ id: 2 });
      setTimeout(async() => {
        expect(await restaurantBookmark.getAllRestaurant())
        .toEqual([
          { id: 1 },
          { id: 2 },
        ]);
        done()
      }, 700);
    });

    fit('should remove bookmarked Restaurant', async (done) => {
      await restaurantBookmark.putRestaurant({ id: 1 });
      await restaurantBookmark.putRestaurant({ id: 2 });
      await restaurantBookmark.putRestaurant({ id: 3 });
  
      setTimeout( async() => {
        await restaurantBookmark.deleteRestaurant(1);
        expect(await restaurantBookmark.getAllRestaurant())
        .toEqual([
          { id: 2 },
          { id: 3 },
        ]);
        done();
      }, 700);
      
    });

    fit('should handle request to remove a Restaurant even though the Restaurant has not been added', async (done) => {
        await restaurantBookmark.putRestaurant({ id: 1 });
        await restaurantBookmark.putRestaurant({ id: 2 });
        await restaurantBookmark.putRestaurant({ id: 3 });
      setTimeout( async() => {
        await restaurantBookmark.deleteRestaurant(4);
        expect(await restaurantBookmark.getAllRestaurant())
          .toEqual([
            { id: 1 },
            { id: 2 },
            { id: 3 },
          ]);
          done();
      }, 900);
    });

    fit('should be able to search for Restaurants', async (done) => {
      await restaurantBookmark.putRestaurant({ id: 1, name: 'resto a' });
      await restaurantBookmark.putRestaurant({ id: 2, name: 'resto b' });
      await restaurantBookmark.putRestaurant({ id: 3, name: 'resto abc' });
      await restaurantBookmark.putRestaurant({ id: 4, name: 'ini mah resto abcd' });
      setTimeout(async () => {
        expect(await restaurantBookmark.searchRestaurants('resto a')).toEqual([
          { id: 1, name: 'resto a' },
          { id: 3, name: 'resto abc' },
          { id: 4, name: 'ini mah resto abcd' },
        ]);
        done();
      }, 700);
     
    });


  };
  
  export { itActsAsRestaurantBookmarkModel };
  