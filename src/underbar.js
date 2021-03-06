(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === 0) {
      return [];
    }
    else {
      return n === undefined ? array[array.length - 1] : array.slice(-n);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }
    else if (typeof collection === 'object') {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }      
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function (element, index) {
      if (element === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {  
    var result = [];
    // _.each(collection, function (element, index) {
    //     if (test(element)) {
    //       result.push(element);
    //     } 
    //   });
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        if (test(collection[i], i, collection)) {
          result.push(collection[i]);
        }
      }
    }
    else if (typeof collection === 'object') {
      for (var key in collection) {
        if (test(collection[key], key, collection)) {
          result.push(collection[key]);
        }      
      }
    }
    return result;
  };


  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    return _.filter(collection, function (element, index) {
      return test(element) === false
    })
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function (array) {
    var result = [];

    _.each(array, function (element, index) {
      if (_.indexOf(array, element) === index) {
        result.push(element);
      }
    })
    return result;
  };
  // _.uniq = function (array) {
  //   // why is index undefined within the _.filter call? in the first solution index 
  //   // equals the expected order within the _.each call
  //   return _.filter(array, function (element, index) {
  //     console.log(index);
  //     return _.indexOf(array, element) === index;
  //   });
  // };
  

  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    var result = [];
    _.each(collection, function (element, index) {
      result[index] = iterator(element, index);
    });
    return result;  
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) { 
    var result;
    accumulator != undefined ? result = accumulator : result = collection.shift();

    _.each(collection, function (element) {
      result = iterator(result, element);
    })

    return result;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, element) {
      if (wasFound) {
        return true;
      }
      return element === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if(iterator === undefined) {
      iterator = Boolean;
    }

    return _.reduce(collection, function(passedTest, element) {
      if(!passedTest) {
        return false;
      }
      return Boolean(iterator(element));
    }, true)
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if(iterator === undefined) {
      iterator = _.identity;
    }
    // return _.reduce(collection, function(passedTest, element) {
    //   if(passedTest) {
    //     return true;
    //   }
    //   return Boolean(iterator(element));
    // }, false)  
      return !_.every(collection, function(element) {
        return !iterator(element);
      })
    };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var args = [].slice.call(arguments, 1);

    for (var i = 0; i < args.length; i++) {
      for (var key in args[i]) {
        obj[key] = args[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    /***
    // dump all to be added objects into var args
    var args = [].slice.call(arguments, 1);
    // filter duplicated properties out of args
    _.each(args, function (newProperties, index) {
      passedArgs.push(_.filter(newProperties, function (property, key) {
        // need a truth test to match the keys in this object with original obj
        return !(key in obj);
      }))  
    });
    args.unshift(obj);
    // extend obj with remaining properties in args
    return _.extend.apply(null, args);
    ***/
    var args = [].slice.call(arguments, 1);

    for (var i = 0; i < args.length; i++) {
      for (var key in args[i]) {
        if (!(key in obj)) {
          obj[key] = args[i][key];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // create an object to store results
    var memory = {};
    var result;
    // return an anonymous function to handle the memory check
    return function (arg) {
      // within the returned function check to see if arguments[0] in memory
      if(arg in memory) {
        // if it is, result = memory[arguments[0]]
        result = memory[arg];  
      }
      else {
        // if not, run the function and store in memory as argument[0] : result
        result = func.apply(null, arguments)
        memory[arg] = result; 
      }
      // return result  
      return result;    
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    setTimeout.apply(null, arguments);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var result = array.slice();
    var randomIndex, storage;

    for (var i = 0; i < result.length; i++) {
      randomIndex = Math.floor(Math.random()) * (result.length - 1);
      storage = result[i];
      result[i] = result[randomIndex];
      result[randomIndex] = storage;
    }

    return result;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(value) {
      return typeof functionOrKey === 'string' ? value[functionOrKey].apply(value, args) : functionOrKey.apply(value, args);
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Range takes a number an returns an array with values 0 - n minus 1
  // Cannot customize start, end or step. Always starts a 0 with a step of 1
  _.range = function(n) {
    return _.map(new Array(n), function(space, i) {
      return i;
    });
  };
  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var args = [].slice.call(arguments);
    var len = _.reduce(args, function(maxLength, item) {
      return item.length > maxLength ? item.length : maxLength;
    }, 0);
    return _.map(_.range(len), function(slot, index) {
      return _.map(args, function(array) {
        return array[index];
      });
    });
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray) {
    return _.reduce(nestedArray, function(memo, item) {
      return Array.isArray(item) ? memo.concat(_.flatten(item)) : memo.concat(item);
    }, []);
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = [].slice.call(arguments);
    // convert all arrays to objects for constant time lookup
    var objArgs = _.map(args, function(array) {
      return _.reduce(array, function(memo, item) {
        memo[item] = true;
        return memo;
      }, {});
    });
    // reduce array of objects to one object containing all values that intersect
    var sharedKeys = _.reduce(objArgs, function(memo, obj) {
      _.each(memo, function(value, key) {
        if (key in obj === false) { delete memo[key]; }
      });
      return memo;
    });
    
    // return keys
    return Object.keys(sharedKeys);
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };

  _.test = function () {
    var args = [].slice.call(arguments, 1);
    console.log(args);
  };

}());
