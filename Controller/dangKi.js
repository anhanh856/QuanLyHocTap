
function tableController($scope, $http, $rootScope) {
    $scope.isLoading = false;
    $scope.isSuccess = false;
    $scope.message = "";
    $scope.students = [];
    $scope.index = -1;
    $scope.student = {
        id: "",
        username: "",
        password: "",
        fullname: "",
        email:"",
        gender:"",
        birthday:"",
        role:""

    }


    const url = 'https://6214fc3bcdb9d09717a8ea1a.mockapi.io/student';
    $scope.isLoading = true;
    $http.get(url) // Gửi 1 request tới API với method GET
        .then(function (response) {
            $scope.students = response.data;
            $scope.isLoading = false;
        })
        .catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });

    $scope.onFormSubmit = function (event) {
        event.preventDefault();
        // Gửi request dạng POST kèm dữ liệu lên API
        TODO:
        if ($scope.index == -1) {
            $scope.isLoading = true;
            $http.post(url, $scope.student)
                .then(function (response) {
                    // Tắt loading
                    $scope.isLoading = false;

                    // Thêm vào table
                    $scope.students.push(response.data);

                    // Thông báo
                    $scope.message = "Đăng Ký Thành Công";
                    console.log($scope.index);

                    $scope.isSuccess = true;


                })
                .catch(function (error) {
                    console.log(error);
                    $scope.isLoading = false;

                    $scope.message = "Đăng Ký thất bại";
                    $scope.isSuccess = false;
                });

        }else {
            // // Cập nhật
            const id = $scope.students[$scope.index].id;
            const updateApi = url + "/" + id;
            $scope.isLoading = true;
            
            $http.put(updateApi, $scope.student)
                .then(function (response) {
                    $scope.isLoading = false;
                    $scope.message = "Cập nhật thành công";
                    $scope.isSuccess = true;
                    $http.get(url).then(function (response) {
                        $scope.students = response.data;
                        $scope.isLoading = false;
                    })

                });
        }
        // Thêm mới
        $scope.index = -1;
    };

    $scope.onDelete = function (index) {
        const id = $scope.students[index].id;
        const apiDelete = url + "/" + id;

        // Gọi API với method DELETE
        $http.delete(apiDelete)
            .then(function (response) {
                // Xóa trên table
                $scope.students.splice(index, 1);
            })
    }
    $scope.edit = function (index) {
        $scope.index = index;
        $scope.student = angular.copy($scope.students[index]);
        console.log($scope.index);
    }
    

}

app.controller("table_controller", tableController);