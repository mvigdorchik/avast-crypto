{ pkgs ? import <unstable> {} }:

with pkgs;

let
  inherit (lib) optional optionals;

  nodejs = nodejs-11_x;
in

mkShell {
  buildInputs = [ nodejs ];

    # Put the PostgreSQL databases in the project diretory.
    shellHook = ''
      echo "Enter MelonJS Project"
    '';
}
