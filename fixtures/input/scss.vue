<style lang="scss">
@media (max-width: 480px) {
  .bad-example-css {
    position: relative;
    top: 1px;
    right: 1px;
    bottom: 1px;
    left: 1px;
  }

  .bad-example-scss {
    $var: 1;
    @if ($var == 1) {
      .foo {
        color: red;
      }
    } @else {
      .foo {
        color: blue;
      }
    }
  }

  .bad-example-formatter {
      font-family: "Bad Indent",serif;
       color: red;
      }

  .bad-example-ordered {
    display: block;
    right: 1px;
    position: relative;
    top: 1px;
  }
}
</style>
