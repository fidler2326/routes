angular.module('myRoutes')
	.filter('empty', function() {
		return function(data) {
			try {
				if (typeof(data) == 'undefined' || data === null) {
					return true;
				}
				if (typeof(data) == 'number' || typeof(data) == 'boolean') {
					return false;
				}
				if (typeof(data.length) != 'undefined') {
					return data.length == 0;
				}
				var count = 0;
				for(var i in data) {
					if(data.hasOwnProperty(i)) {
						count ++;
					}
				}
				return count == 0;
			} catch(e) {}
			return false;
		}
	});
