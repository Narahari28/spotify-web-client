/* Error class that displays the appropriate error message for the page */

import React, { Component } from 'react';
import {browserHistory} from 'react-router';

var Err = React.createClass({
  toLogin: function () {
    browserHistory.push('/');
  },
  render: function () {
    // injected via react-router
    const { errorMsg } = this.props.params;
    // If no error msg in props, then we assume that we've reached a nonexistent page
    var displayedError = errorMsg ? errorMsg : "This page doesn't exist";
    return (
      <div>
        <div className="error">
          <h2>An Error Occured!</h2>
          <p style={{color: 'black', fontWeight: 'bold'}}>{displayedError}</p>
        </div>
        <div className="filler">
          <p style={{textAlign: 'center', color: 'black', fontSize: '17px'}}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit tellus elit, quis aliquet est porttitor sed. Integer eu libero ut eros pretium blandit non placerat purus. Maecenas a mauris id libero condimentum condimentum. Morbi interdum condimentum augue at tincidunt. Sed tincidunt ante sed nulla vestibulum, et malesuada nunc aliquam. Suspendisse sit amet fermentum tortor. In gravida, est eu consequat convallis, mauris tortor tempor ex, efficitur volutpat urna ante non risus. Aliquam commodo ornare odio, feugiat placerat diam faucibus vel. Sed et justo non quam pulvinar porttitor at id mauris. Morbi eget ante aliquam, ullamcorper orci vitae, dignissim mi. Morbi vel nibh efficitur, maximus lacus non, vestibulum lorem.
Phasellus suscipit, lorem ut aliquet scelerisque, odio ex gravida felis, in egestas odio est eget ligula. Ut aliquam finibus ante id suscipit. Integer mattis tortor sed tortor posuere, id posuere justo efficitur. Sed vitae congue velit. In porta blandit dui, volutpat mollis ex blandit nec. Donec venenatis varius quam quis semper. Aliquam elementum blandit sapien. Vivamus maximus, odio ut rhoncus sollicitudin, lorem massa gravida leo, ut gravida purus felis et nunc. Fusce quis risus placerat, sollicitudin nisi quis, fringilla magna. Etiam quis facilisis arcu. Donec cursus pharetra metus, eget porttitor ante rhoncus at. Fusce vulputate turpis quis gravida maximus. Spotify Web Client is a customized feed that lets you listen to your private and collaborative playlists and discover new music! Vivamus molestie volutpat sapien, sed aliquam nisl sodales vel. In maximus neque sit amet egestas accumsan. Pellentesque vitae vehicula orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
Suspendisse tellus risus, placerat ut nulla ut, iaculis porttitor urna. Vivamus dui ex, molestie nec pulvinar blandit, maximus non orci. Cras urna augue, semper et massa sed, tempus posuere felis. Praesent consequat sem eget porttitor sodales. Cras malesuada hendrerit arcu et interdum. Aenean maximus ante eros, id sagittis justo faucibus vitae. Proin in tellus sem. Nunc molestie vestibulum massa a gravida. Curabitur tempus turpis quis ex finibus, sed porta justo accumsan.
In auctor ligula a ipsum cursus, id congue odio rhoncus. Nulla suscipit, orci sit amet imperdiet bibendum, augue sapien finibus tortor, quis bibendum turpis ex a massa. Donec pellentesque risus ut odio rhoncus, ut pretium nulla consequat. Donec enim sapien, vestibulum in fringilla at, iaculis lacinia tellus. Vestibulum molestie nisi vitae sem commodo, sed ullamcorper justo porta. Quisque leo tellus, varius at sagittis ut, sodales vitae ante. Fusce bibendum porta massa, vel volutpat ligula mollis non.
Maecenas aliquam consequat metus, ultricies egestas enim tempor sed. Vestibulum porta massa pretium varius tincidunt. In feugiat arcu a maximus dignissim. Mauris et viverra odio. Donec venenatis justo nec diam tempor vulputate. Quisque faucibus, sapien sit amet lobortis dignissim, tellus metus viverra nibh, ut vulputate lectus eros non arcu. Duis id elit id sapien laoreet fringilla. Curabitur dui neque, scelerisque sit amet nunc vitae, fermentum tristique turpis. Mauris et hendrerit neque. </p> 
        </div>
        <div className="toLogin">
          <button type="button" onClick={this.toLogin} style={{marginTop: '3%', marginLeft: '38%', marginRight: '38%', backgroundColor: 'green', color: 'white', borderRadius: "70%", width: "70px", height: "50px", fontWeight: 'bold', fontSize: '13px'}}> Login Page </button>
        </div>
      </div>
    );
  }
});

export default Err;