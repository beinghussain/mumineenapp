import React, { Component } from "react";
import $ from "jquery";
import { Avatar, ListItem } from "material-ui";

class Youtube extends Component {
	state = {
		searchList: []
	};
	searchInstagram = e => {
		if (e.target.value === "") {
			this.hideList();
		}
		let that = this;
		$.get("https://www.instagram.com/web/search/topsearch/?context=blended&query=" + e.target.value + "&rank_token=0.8363943057400951", res => {
			that.setState({
				searchList: res.users.slice(0, 5)
			});
		});
	};
	hideList = () => {
		this.setState({
			searchList: []
		});
	};
	render() {
		return (
			<div className="youtube_container">
				<div>
					<div className="searchContainer">
						<input onFocus={this.hideList} className="instagram_search" onChange={this.searchInstagram} placeholder="Your instagram username" />
					</div>
					{this.state.searchList.length > 0 ? (
						<div className="searchList">
							{this.state.searchList.map((item, index) => {
								return <ListItem key={index} primaryText={item.user.username} secondaryText={item.user.full_name} leftAvatar={<Avatar src={item.user.profile_pic_url} />} />;
							})}
						</div>
					) : null}
					<div className="searchContainer">
						<input onFocus={this.hideList} className="instagram_search" onChange={this.searchInstagram} placeholder="Video title" />
					</div>
					<div className="searchContainer">
						<input onFocus={this.hideList} className="instagram_search" onChange={this.searchInstagram} placeholder="Video Description" />
					</div>
				</div>
			</div>
		);
	}
}

export default Youtube;
