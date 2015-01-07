'use strict';
angular.module ('com.module.components')
  .controller ('ComponentCtrl', function ($scope) {

  $scope.boxes = [];

  $scope.addComponent = function (name, color, icon, quantity, href) {
    $scope.boxes.push ({
      name: name,
      color: color,
      icon: icon,
      quantity: quantity,
      href: href
    });
  };

  $scope.addComponent('Autofields', 'bg-blue', 'ion-document-text', '1', 'app.components.autofields');

});