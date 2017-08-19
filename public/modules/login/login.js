import React from "react";
import {ajax} from "tools";
import style from './login.css'
import {message, Card , Checkbox , Form, Icon, Input, Button } from 'antd';
import {hashHistory} from "react-router";
const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={};
	}
	handleSubmit (e)  {
      e.preventDefault();
   	  this.props.form.validateFields((err, values) => {
      if (!err) {
        let user = values.userName;
        let pwd = values.password;
        let rem = values.remember;

	        if(!/^[a-zA-Z0-9]{6,10}$/.test(pwd)){
	               message.error('密码格式不正确');
	               return false;
	        }
            ajax({
              type:'post',
              url:'/users/login',
              data:{
                user:user,
                pwd:pwd
              },
              success:(data)=>{
                if(data.status == 1){
                    hashHistory.push('/index');
                }
                else if(data.status == 0){
                    message.error('用户名和密码不匹配');
                }
              }

            })
        
      }
    });
  }

 render(){
 	const { getFieldDecorator } = this.props.form;
 	return <div className={style.div1}>
 	<Card title='花之语管理系统' bordered={false}>
 		<Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>7天免登陆</Checkbox>
          )}
          <a className={style.div2} href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className={style.div3}>
           登录
          </Button>
        </FormItem>
      </Form>
      </Card>
 	</div>
 }	
}

export default Form.create()(Login);