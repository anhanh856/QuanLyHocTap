
// đăng kí
function tableController($scope, $http) {
    $scope.isLoading = false;
    $scope.isSuccess = false;
    $scope.message = "";
    $scope.students = [];
    $scope.student = {
        id: "",
        username: "",
        password: "",
        fullname: "",
        email:"",
        gender:"",
        birthday:"",
        role:"true",

    };
   

    const url = 'https://6214fc3bcdb9d09717a8ea1a.mockapi.io/user';
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

        TODO:
        // if (index == -1) {
        //     // Thêm mới
        // } else {
        //     // Cập nhật
        // }

        // Gửi request dạng POST kèm dữ liệu lên API
        $scope.isLoading = true;
        $http.post(url, $scope.student)
            .then(function (response) {
                // Tắt loading
                $scope.isLoading = false;

                // Thêm vào table
                $scope.students.push(response.data);

                // Thông báo
                Swal.fire({
                    icon: "success",
                    title: "Đăng kí thành công!",
                });
                $http.get(url)
                .then( (response ) => {
                    $scope.students = response.data ;    
                })

                $scope.isSuccess = true;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;

                $scope.message = "Đăng Ký thất bại";
                $scope.isSuccess = false;
            });
    }
}
app.controller("dang_ki", tableController);
// đăng nhâp
app.controller( "myStudent" , ($scope , $rootScope , $http)=> {
    $scope.students= []
    $rootScope.student = {} ;
    $rootScope.checkAcount = false;
    $rootScope.checkRole = true;

    $http.get("https://6214fc3bcdb9d09717a8ea1a.mockapi.io/user")
    .then( (response ) => {
        $scope.students = response.data ;    
    })

    console.log ( $scope.students)
    $scope.loginStudent = ( ) => {
        var check = false ;
        
        for( var i=0 ; i<$scope.students.length ; i++ ){
            if( $rootScope.student.email == $scope.students[i].email && $rootScope.student.password == $scope.students[i].password ){
                $rootScope.student = $scope.students[i] ;
                check = true ;
                $rootScope.checkAcount = true ;
                if($rootScope.student.role == "false"){
                    $rootScope.checkRole = false;

                }
                break ;
                
            }
            
        }
        if( check ){
            Swal.fire({
				icon: "success",
				title: "Đăng nhập thành công",
			});
        
        }else{
            Swal.fire({
				icon: "error",
				title: "Đăng nhập thất bại",
			});
        }
    }

    $scope.register = () => {
        for( var i=0 ; i < $scope.students ; i++ ){
            
        }
    }

    $rootScope.exitStudent = ( ) => {
        $rootScope.checkAcount = false ;
        $rootScope.student = {} ;
        $rootScope.checkRole = true;
        Swal.fire({
            icon: "success",
            title: "Đăng xuất thành công!",
        });
    }

});
