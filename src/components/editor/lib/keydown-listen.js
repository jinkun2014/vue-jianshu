/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-03T00:31:20+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: keydown-listen.js
 * @Last modified by:   chenhuachao
 * @Last modified time: 2017-12-04T00:03:33+08:00
 * @License: MIT
 * @Copyright: 2017
 */

/**
 * Created by zhy on 2017/4/24.
 */
const KEY_CODE = {
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  B: 66,
  I: 73,
  H: 72,
  U: 85,
  D: 68,
  M: 77,
  Q: 81,
  O: 79,
  L: 76,
  S: 83,
  Z: 90,
  Y: 89,
  C: 67,
  T: 84,
  R: 82,
  DELETE: 8,
  TAB: 9,
  ENTER: 13,
  ONE: 97,
  TWO: 98,
  THREE: 99,
  FOUR: 100,
  FIVE: 101,
  SIX: 102,
  _ONE: 49,
  _TWO: 50,
  _THREE: 51,
  _FOUR: 52,
  _FIVE: 53,
  _SIX: 54,
  ESC: 27
};
export const keydownListen = ($vm) => {
  $vm.$el.addEventListener('keydown', function (e) {
    // 注册监听键盘事件
    if (!(e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
      // one key
      switch (e.keyCode) {
        case KEY_CODE.F8: {
          // F8 导航
          e.preventDefault()
          break;
        }
        case KEY_CODE.F9: {
          // F9 预览模式
          e.preventDefault()
          break;
        }
        case KEY_CODE.F10: {
          // F10 全屏
          e.preventDefault()
          break;
        }
        case KEY_CODE.F11: {
          // F11 阅读
          e.preventDefault()
          break;
        }
        case KEY_CODE.F12: {
          // F12 单双栏切换
          e.preventDefault()
          break;
        }
        case KEY_CODE.TAB: {
          // TAB
          e.preventDefault()
          $vm.$i_e_insertTab()
          break;
        }
        case KEY_CODE.ESC: {
          // ESC
          e.preventDefault()
          $vm.$i_e_exitFullscreen()
          break;
        }
        // case KEY_CODE.ENTER: {
        //   // enter
        //   e.preventDefault()
        //   break;
        // }
      }
    } else if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
      // ctrl +
      switch (e.keyCode) {
        case KEY_CODE.B: {
          // B
          e.preventDefault()
          break;
        }
        case KEY_CODE.I: {
          // I
          e.preventDefault()
          break;
        }
        case KEY_CODE.H: {
          // H
          e.preventDefault()
          break;
        }
        case KEY_CODE.U: {
          // U
          e.preventDefault()
          break;
        }
        case KEY_CODE.D: {
          // D
          e.preventDefault()
          $vm.$i_e_removeLine()
          break;
        }
        case KEY_CODE.M: {
          // M
          e.preventDefault()
          break;
        }
        case KEY_CODE.Q: {
          // Q
          e.preventDefault()
          break;
        }
        case KEY_CODE.O: {
          // O
          e.preventDefault()
          break;
        }
        case KEY_CODE.L: {
          // L
          e.preventDefault()
          break;
        }
        case KEY_CODE.S: {
          // S
          e.preventDefault()
          $vm.$i_e_save()
          break;
        }
        case KEY_CODE.Z: {
          // Z
          e.preventDefault()
          $vm.$i_e_undo();
          break;
        }
        case KEY_CODE.Y: {
          // Y
          e.preventDefault()
          break;
        }
        case KEY_CODE.DELETE: {
          // delete
          e.preventDefault()
          break;
        }
        case KEY_CODE.ONE: {
          // ONE
          e.preventDefault()
          break;
        }
        case KEY_CODE.TWO: {
          // TWO
          e.preventDefault()
          break;
        }
        case KEY_CODE.THREE: {
          // THREE
          e.preventDefault()
          break;
        }
        case KEY_CODE.FOUR: {
          // FOUR
          e.preventDefault()
          break;
        }
        case KEY_CODE.FIVE: {
          // FIVE
          e.preventDefault()
          break;
        }
        case KEY_CODE.SIX: {
          // SIX
          e.preventDefault()
          break;
        }
        case KEY_CODE._ONE: {
          // ONE
          e.preventDefault()
          break;
        }
        case KEY_CODE._TWO: {
          // TWO
          e.preventDefault()
          break;
        }
        case KEY_CODE._THREE: {
          // THREE
          e.preventDefault()
          break;
        }
        case KEY_CODE._FOUR: {
          // FOUR
          e.preventDefault()
          break;
        }
        case KEY_CODE._FIVE: {
          // FIVE
          e.preventDefault()
          break;
        }
        case KEY_CODE._SIX: {
          // SIX
          e.preventDefault()
          break;
        }
      }
    } else if ((e.ctrlKey || e.metaKey) && e.altKey && !e.shiftKey) {
      // ctrl + alt +
      switch (e.keyCode) {
        case KEY_CODE.S: {
          // S
          e.preventDefault()
          break;
        }
        case KEY_CODE.U: {
          // U
          e.preventDefault()
          break;
        }
        case KEY_CODE.L: {
          // L
          e.preventDefault()
          break;
        }
        case KEY_CODE.C: {
          // C
          e.preventDefault()
          break;
        }
        case KEY_CODE.T: {
          // T
          e.preventDefault()
          break;
        }
      }
    } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && !e.altKey) {
      // ctrl + shift
      switch (e.keyCode) {
        case KEY_CODE.S: {
          // S
          e.preventDefault()
          break;
        }
        case KEY_CODE.D: {
          e.preventDefault()
          break;
        }
        case KEY_CODE.L: {
          e.preventDefault()
          break;
        }
        case KEY_CODE.R: {
          e.preventDefault()
          break;
        }
        case KEY_CODE.C: {
          e.preventDefault()
          break;
        }
        case KEY_CODE.Z: {
          e.preventDefault()
          $vm.$i_e_redo()
          break;
        }
      }
    } else if (!(e.ctrlKey || e.metaKey) && e.shiftKey && !e.altKey) {
      // shift +
      switch (e.keyCode) {
        case KEY_CODE.TAB: {
          // TAB
          e.preventDefault()
          $vm.$i_e_unInsertTab()
          break;
        }
      }
    }
  });
}
