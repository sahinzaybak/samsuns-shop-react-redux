import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
//Components
import BasketList from '../components/basket-page/basketList'
import BasketSummary from '../components/basket-page/basketSummary'
import CouponCode from '../components/basket-page/couponCode'
const { confirm } = Modal;
class basket extends PureComponent {
  orderComplete(){
    const vm = this.props;
    confirm({
      title: 'Siparişi tamamlamak istediğinizden emin misiniz?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Evet',
      okType: 'success',
      cancelText: 'Hayır',
      confirmLoading:true,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 1000 ? resolve  : reject, 1000);
          setTimeout(() => {
            vm.history.push("/basket/payment")
          }, 1000);
        }).catch(() =>false);
      },
    });
  }
  render() {
    return (
      <div className="basket-page">
        <div className="basket">
          <h4 class="basket-title">Sepetim ({this.props.basketList.length} Ürün)</h4>
          <div className="row">
            <div className="col-md-8">
              {this.props.basketList.map((basketList,index) => (
                <BasketList basket={basketList} basketProductIndex={index}/>
              ))}
            </div>
            <div className="col-md-4">
              <div className="basket-summary">
                <h5 class="basket-title mb-3">Sipariş Özeti</h5>
                <BasketSummary basket={this.props.basketList}/>
              </div>
              <div className="basket-summary coupon mt-3">
                <CouponCode />
              </div>
              <a className="button w-100 text-center mt-4 green" onClick={this.orderComplete.bind(this)}>Siparişi Tamamla</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    basketList: state.basket.basketList
  };
};

export default connect(mapStateToProps)(basket);