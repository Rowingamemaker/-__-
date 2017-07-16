<?php 
namespace Admin\Controller;
use Think\Controller;
	class LinchaoController extends Controller {
		public function index(){
			echo 'linchao';
		}
		//M
		public function addwenjian(){
			// 		//获得小程序传过来的数据
  			$wenjianjia=I('get.wenjianjia');
  			//添加数据到数据库
  			$user=M('linchao');
  			$data['wenjianjia']=$wenjianjia;
  			//按照id查找like的值
  			//让like的值加1
			if ($user->data($data)->add()!=0) {
				# code...
				$arr=$user->order('id DESC')->select();
				echo json_encode($arr);
			}else{
				echo '0';
			}
		}
		//返回所以文件夹的名称
		public function wenjianselect(){
			$user=M('linchao');
			$arr=$user->order('id DESC')->select();
			echo json_encode($arr);
		}
		//接受小程序发过来的图片
		public function upload(){
			if(IS_POST){
				$upload = new \Think\Upload();// 实例化上传类
				$upload->maxSize  =   3145728 ;// 设置附件上传大小
				$upload->exts   =   array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
				$upload->rootPath =   './Uploads/'; // 设置附件上传根目录
				$upload->savePath =   ''; // 设置附件上传（子）目录
				$upload->autoSub=false;
				// 上传文件 
				$info  =  $upload->upload();
				if(!$info) {// 上传错误提示错误信息
					echo "上传失败";
				}else{// 上传成功 获取上传文件信息
				//插入到数据库中
					foreach($info as $file){
						$uid=$_POST['uid'];
				      	$data['img']='https://boboxiaochengxu.com/Uploads/'.$file['savename'];
				      	$data['uid']=$uid;
				      	$model=M('linchaoimg');
				      	$model->data($data)->add();
				    }

				}
			}else{
				echo  8888888;
			}
		}
		////////
		//更新图片
		public function upload1(){
			if(IS_POST){
				$upload = new \Think\Upload();// 实例化上传类
				$upload->maxSize  =   3145728 ;// 设置附件上传大小
				$upload->exts   =   array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
				$upload->rootPath =   './Uploads/'; // 设置附件上传根目录
				$upload->savePath =   ''; // 设置附件上传（子）目录
				$upload->autoSub=false;
				// 上传文件 
				$info  =  $upload->upload();
				if(!$info) {// 上传错误提示错误信息
					echo "上传失败";
				}else{// 上传成功 获取上传文件信息
				//插入到数据库中
					foreach($info as $file){
						$uid=$_POST['uid'];
				      	$data['img']='https://boboxiaochengxu.com/Uploads/'.$file['savename'];
				      	$where['id']=$uid;
				      	$model=M('linchaoimg');
				      	// $model->data($data)->add();
				      	$model->where($where)->save($data);
				    }

				}
			}else{
				echo  8888888;
			}
		}
		////返回不同文件夹的图片内容  倒序输出
		public function imgtotal(){
			$uid=$_GET['uid'];
			$model=M('linchaoimg');
			$where['uid']=$uid;
			$res=$model->where($where)->order('id DESC')->select();
			echo json_encode($res);
		}	
		///删除文件夹
		public function delwenjianjia(){
			$id=$_GET['id'];
			$where['id']=$id;
			$model=M('linchao');
			$res=$model->where($where)->delete();
			if ($res!=0||$res!=false) {
				# code...
				//删除成功
				$arr=$model->order('id DESC')->select();
				echo json_encode($arr);
			}else{
				//删除失败
				echo "0";
			}
		}
		//搜索栏
		public function sousuo(){
			$wenjianname=$_GET['wenjianname'];
			$where['wenjianname']=$wenjianname;
			$model=M('linchao');
			$res=$model->where($where)->find();
			if ($res==false||$res==null) {
				# code...
				//没有搜索到
				echo '1';
			}else{
				//搜索到了				echo $wenjianname;
				// echo json_encode($res);
				echo $wenjianname;
			}
		}
		public function adduser(){
			$username=I('get.username');
			$password=I('get.password');
  			//添加数据到数据库
  			$user=M('linchaouser');
  			$data['username']=$username;
  			$data['password']=$password;
  			//按照id查找like的值
  			//让like的值加1
			if ($user->data($data)->add()!=0) {
				# code...
				$arr=$user->order('id DESC')->select();
				echo json_encode($arr);
			}else{
				echo '0';
			}
		}
		public function login(){
			$username=I('get.username');
			$password=I('get.password');
  			//添加数据到数据库
  			$user=M('linchaouser');
  			$where['username']=$username;
  			$where['password']=$password;
  			$res=$user->where($where)->find();
			if ( is_array($res)) {
				# code...
				//数据库有账号密码 登陆成功
				echo '1';
			}else{
				//登陆失败
				echo '0';
			}
		}
		//删除图片
		public function delimg(){
			$id=I('get.id');
			$where['id']=$id;
			$user=M('linchaoimg');
			$res=$user->where($where)->delete();
			if ($res!=null) {
				# code...
				echo "del";
			}else{
				echo "fail";
			}
		}
		//查找图片
		public function lookimg(){
			$id=I('get.id');
			$where['id']=$id;
			$user=M('linchaoimg');
			$res=$user->where($where)->find();
			echo json_encode($res);
		}
		public function userlook(){
			$user=M('goods');
			$res=$user->select();
			echo json_encode($res);
		}
	}

 ?>