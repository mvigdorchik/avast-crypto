{ pkgs ? import <unstable> {} }:

with pkgs;

let
  inherit (lib) optional optionals;
in

mkShell {
  buildInputs = [ nodejs nodePackages.grunt-cli];

    # Put the PostgreSQL databases in the project diretory.
    shellHook = ''
      echo "Enter MelonJS Project"
    '';
}
