{ pkgs ? import <unstable> {} }:

with pkgs;

let
  inherit (lib) optional optionals;
in

mkShell {
  buildInputs = [ nodejs nodePackages.typescript nodePackages.grunt-cli nodePackages.typescript-language-server];

    # Put the PostgreSQL databases in the project diretory.
    shellHook = ''
      echo "Enter MelonJS Project"
    '';
}
