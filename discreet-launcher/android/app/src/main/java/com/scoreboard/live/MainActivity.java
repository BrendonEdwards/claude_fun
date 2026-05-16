package com.scoreboard.live;

import android.view.KeyEvent;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

  @Override
  public boolean onKeyDown(int keyCode, KeyEvent event) {
    if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
      String url = bridge.getWebView().getUrl();
      // If Grindr (or any non-localhost page) is showing, snap back to the cover app
      if (url != null && !url.startsWith("https://localhost")) {
        bridge.getWebView().loadUrl("https://localhost");
        return true; // consume the key event — no volume change, no sound feedback
      }
    }
    return super.onKeyDown(keyCode, event);
  }
}
