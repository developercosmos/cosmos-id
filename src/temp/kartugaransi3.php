<?php
/*
Plugin Name: Kartu Garansi 3
Plugin URI: https://cosmos.id/kartu-garansi3
Description: Kartu Garansi Cosmosid
Version: 1.0.0
Author: cosmos id
License: GPL2
*/

include_once('simple_html_dom3.php');

//
// function prefix_enqueue()
// {
//   // JS
//   wp_register_script('prefix_bootstrap', 'https://cosmos.id/wp-content/plugins/kartugaransi3/assets/js/bootstrap.bundle.min.js');
//   wp_enqueue_script('prefix_bootstrap');

//   // CSS
//   wp_register_style('prefix_bootstrap', 'https://cosmos.id/wp-content/plugins/kartugaransi3/assets/css/bootstrap.min.css');
//   wp_enqueue_style('prefix_bootstrap');

//   // FONT AWESOME
//   wp_register_style('prefix_bootstrap', 'https://cosmos.id/wp-content/plugins/kartugaransi3/assets/css/all.min.css');
//   wp_enqueue_style('prefix_bootstrap');
// }
// add_action('wp_enqueue_scripts', 'prefix_enqueue');
add_action('wp_default_scripts', function ($scripts) {
    if (!empty($scripts->registered['jquery'])) {
        $scripts->registered['jquery']->deps = array_diff($scripts->registered['jquery']->deps, ['jquery-migrate']);
    }
});

function form3()
{

  if (isset($_POST['register'])) {
    echo ($_POST['nama_toko']);
    echo ($_POST['wilayah']);
  }
  // if (isset($_POST['register'])) {
  //   echo ($_POST['nama_toko']);
  //   echo ($_POST['wilayah']);
  // }

  $url = "https://images.cosmos.id/";
  $html = file_get_html3($url);
  // foreach ($html->find('pre') as $postDiv) {
  //   foreach ($postDiv->find('a') as $a) {
  //     echo $a->attr['href'] . "<br>";
  //   }
  // }

  // $remote = wp_remote_get('https://api.rajaongkir.com/starter/province', array(
  //   'headers' => array('key' => 'fae0d9e123b314ed478f6f8504b5fe93')
  // ));

  // $data_province = array();
  // if (is_array($remote) && $remote['response']['code'] == 200) {
  //   $remote_body = json_decode($remote['body']);
  //   $data_province = $remote_body->rajaongkir->results;
  // }



  // get FAMILY PRODUCT
  $urlFamProduct = 'https://api.cosmos.id/api/PRO/Index';

  $dataFamProduct = array(  
    'd' => '[{}]',
    'i' => '11E044EE-33E7-11EB-9D97-0AB723CF68D0'
  );

  $headersFamProduct = array(
    'Content-Type'  => 'application/json',
    'User-Agent'    => 'Your App Name (www.yourapp.com)',
    'Authorization' => 'Basic xxxxxx',
  );

  $argFamProduct = array(
    'headers'   => $headersFamProduct, // good
    //  'header'    => $headers, // bad; i.e. wrong array key ('header')
    'body'      => json_encode($dataFamProduct),
    // 'method' can be omitted since you're using wp_remote_post()
    'method'    => 'POST',
    'sslverify' => false,
  );

  $requestFamProduct = wp_remote_post($urlFamProduct, $argFamProduct);
  // ..if the response still isn't good, what's the output of this:
  $responseFamProduct = json_decode($requestFamProduct['body']);



  // get LIST PROVINCE
  $urlgetProvince = 'https://api.cosmos.id/api/PRO/Index';

  $datagetProvince = array(
    'd' => '[{}]',
    'i' => '1350239D-327D-11EB-B811-0206859B6046'
  );

  $headersgetProvince = array(
    'Content-Type'  => 'application/json',
    'User-Agent'    => 'Your App Name (www.yourapp.com)',
    'Authorization' => 'Basic xxxxxx',
  );

  $arggetProvince = array(
    'headers'   => $headersgetProvince, // good
    //  'header'    => $headers, // bad; i.e. wrong array key ('header')
    'body'      => json_encode($datagetProvince),
    // 'method' can be omitted since you're using wp_remote_post()
    'method'    => 'POST',
    'sslverify' => false,
  );

  $requestgetProvince = wp_remote_post($urlgetProvince, $arggetProvince);
  // ..if the response still isn't good, what's the output of this:
  $responsegetProvince = json_decode($requestgetProvince['body']);

  // print_r($responsegetProvince);

?>
<!-- 
  <link rel="stylesheet" href="https://cosmos.id/wp-content/plugins/kartugaransi3/assets/css/bootstrap.min.css">
  <script src="https://cosmos.id/wp-content/plugins/kartugaransi3/assets/js/bootstrap.bundle.min.js"></script>
  <link rel="stylesheet" href="https://cosmos.id/wp-content/plugins/kartugaransi3/assets/css/all.min.css">
  <script src="https://cosmos.id/wp-content/plugins/kartugaransi3/assets/js/sweetalert2.all.min.js"></script>
  <link href="https://cosmos.id/wp-content/plugins/kartugaransi3/assets/css/select2.min.css" rel="stylesheet" />
  <script src="https://cosmos.id/wp-content/plugins/kartugaransi3/assets/js/select2.min.js"></script>
  <link rel="stylesheet" href="https://cosmos.id/wp-content/plugins/kartugaransi3/assets/css/bootstrap-datepicker.min.css" />
  <script src="https://cosmos.id/wp-content/plugins/kartugaransi3/assets/js/bootstrap-datepicker.min.js"></script>
  <script src="https://cosmos.id/wp-content/plugins/kartugaransi3/assets/js/jquery.watermark.min.js"></script>

  <script src="https://cosmos.id/wp-content/plugins/kartugaransi3/assets/js/moment.min.js"></script>
  <script src="https://cosmos.id/wp-content/plugins/kartugaransi3/assets/js/moment-duration-format.min.js"></script> -->

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.1/css/bootstrap.min.css">
  <script src="https://cosmos.id/wp-content/plugins/kartugaransi3/assets/js/bootstrap.bundle.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/11.4.4/sweetalert2.all.min.js"></script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.9/css/select2.min.css" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.9/js/select2.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>
  <script src="https://cosmos.id/wp-content/plugins/kartugaransi3/assets/js/jquery.watermark.min.js"></script>

  <script src="https://cosmos.id/wp-content/plugins/kartugaransi3/assets/js/moment.min.js"></script>
  <script src="https://cosmos.id/wp-content/plugins/kartugaransi3/assets/js/moment-duration-format.min.js"></script> 


  <style>
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }


    .formInput {
      display: none;
    }

    span.carousel-control-next-icon {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='dark' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z'/%3e%3c/svg%3e");
    }

    span.carousel-control-prev-icon {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='dark' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5L4.25 4l2.5-2.5L5.25 0z'/%3e%3c/svg%3e");
    }


    .select2 {
      width: 100% !important;
    }




    @media (min-width: 1024px) {
      .carousel-item img {
        width: 100% !important;
        height: auto
      }

      .carousel:not(.advanced_responsiveness) .carousel-inner {
        position: relative;
      }
    }
  </style>

  <div class="container">
    <div class="row my-5">
      <div class="col-md-12">
        <ul style="display: none;" id="img">
          <?php foreach ($html->find('pre') as $postDiv) { ?>
            <?php foreach ($postDiv->find('a') as $a) { ?>

              <li value="<?= $a->attr['href'] ?>"><?= $a->attr['href'] ?></li>

            <?php } ?>
          <?php } ?>
        </ul>

        <ul style="display: none;" id="test_img">
          <?php foreach ($html->find('pre') as $postDiv) { ?>
            <?php foreach ($postDiv->find('a') as $a) { ?>

              <li id="<?= $a->attr['href'] ?>"><?= strtolower(str_replace(" ", "-", $a)) ?></li>

            <?php } ?>
          <?php } ?>
        </ul>
      </div>

      <div class="offset-md-2 col-md-8 col-xs-12">
        <form id="formid" action="" method="post">
          <div class="form-group ">
            <!-- <label>Nomor Seri :</label>
            <div class="input-group mb-2">
              <input type="text" class="form-control" id="no_seri">
              <div class="input-group-prepend">
                <div class="input-group-text" id="cek_SN"><i class="fa fa-search text-info"></i><span>-</span>CEK SN</div>
              </div>
            </div> -->
            <label>Nomor Seri : </label>
            <input type="text" class="form-control" id="no_seri">
            <div class="invalid-feedback sn-invalid">
              Mohon Input Nomor Seri
            </div>
            <button type="button" class="btn btn-primary btn-block my-3" id="cek_SN"><i class="far fa-paper-plane"></i> Submit</button>
          </div>

          <div class="form-group formInput">
            <label>Family Produk : </label>
            <select class="form-control" id="produk">
              <option value="">-- Pilih Produk --</option>
              <?php foreach ($responseFamProduct as $row) { ?>
                <option value="<?= $row->fp_id ?>"><?= $row->fd_name ?></option>
              <?php } ?>
            </select>
            <div class="invalid-feedback">
              Mohon Input Family Produk
            </div>
          </div>

          <div class="form-group formInput">
            <label>Model : </label>
            <select class="form-control" id="model">

            </select>

            <div class="invalid-feedback">
              Mohon Input Model
            </div>
          </div>

          <div class="form-group formInput">
            <label>Nama Lengkap * : </label>
            <input type="text" class="form-control" id="nama_lengkap">
            <div class="invalid-feedback">
              Mohon Input Nama Lengkap
            </div>
          </div>

          <div class="form-group formInput">
            <label>Nomor Telepon / HP * : </label>
            <input type="number" class="form-control" id="no_telepon" min="1">
            <div class="invalid-feedback">
              Mohon Input Nomor Telepon / HP
            </div>
          </div>

          <div class="form-group formInput">
            <label>Provinsi ** : </label>
            <select class="form-control js-select2" id="provinsi">
              <option value="">-- Pilih Provinsi --</option>
              <?php foreach ($responsegetProvince as $row) { ?>
                <option value="<?= $row->provinsi ?>"><?= $row->provinsi ?></option>
              <?php } ?>
            </select>
            <div class="invalid-feedback">
              Mohon Input Provinsi
            </div>
          </div>

          <div class="form-group formInput">
            <label>kota/kabupaten * : </label>
            <div class="input-group">
              <select class="form-control js-select2" id="wilayah" name="wilayah">
                <option value="">No Data</option>
              </select>
              <div class="input-group-append">
                
              </div>
            </div>
            <div class="invalid-feedback">
              Mohon Input Kota/Kabupaten
            </div>
          </div>

          <div class="form-group formInput">
            <label>Kode Pos * : </label>
            <div class="input-group">
              <input class="form-control" id="kode_pos" name="kode_pos"></input>
              <button class="" id="btn-pos-helper" class="btn btn-secondary" data-toggle="modal" data-target="#modalKodePos"> ? </button>
              <!-- Modal -->
              <div class="modal fade" id="modalKodePos" role="dialog" aria-labelledby="modalKodePos" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">Pencarian Kode Pos</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="form-group formInput">
                        <label>Kecamatan * : </label>
                        <select class="form-control js-select2" id="kecamatan" name="kecamatan">
                          <option value="">No Data</option>
                        </select>
                        <div class="invalid-feedback">
                          Mohon Input Kecamatan
                        </div>
                      </div>

                      <div class="form-group formInput">
                        <label>Kelurahan * : </label>
                        <select class="form-control js-select2" id="kelurahan" name="kelurahan">
                          <option value="">No Data</option>
                        </select>
                        <div class="invalid-feedback">
                          Mohon Input Kelurahan
                        </div>
                      </div>

                      <div class="form-group formInput">
                        <label>Kode Pos * : </label>
                        <select class="form-control js-select2" id="kode_pos_select" name="kode_pos_select">
                          <option value="">No Data</option>
                        </select>
                        <div class="invalid-feedback">
                          Mohon Input Kode Pos
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" id="btn-post-submit">Use Post Code</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="invalid-feedback">
              Mohon Input Kode Pos
            </div>
            <div id="invalid-kodepos" style="display: none;">
              Kode Pos Salah / Tidak Sesuai
            </div>
          </div>

          <div class="form-group formInput">
            <label>Alamat * : </label>
            <textarea class="form-control" id="alamat" rows="3"></textarea>
            <div class="invalid-feedback">
              Mohon Input Alamat
            </div>
          </div>

          <div class="form-group formInput">
            <label>Email * : </label>
            <input type="email" class="form-control" id="email">
          </div>
          <div class="form-group formInput">
            <label>Tanggal Pembelian * : </label>
            <input type="text" name="tgl_pembelian" class="form-control" id="tanggal_pembelian">
            <div class="invalid-feedback">
              Mohon Input Tanggal Pembelian
            </div>
          </div>
          <div class="form-group formInput" style="display: none;">
            <input type="hidden" name="id_toko" class="form-control" id="id_toko">
          </div>
          <div class="form-group formInput">
            <label>Nama Toko * : </label>
            <input type="text" name="nama_toko" class="form-control" id="nama_toko">
            <div class="invalid-feedback">
              Mohon Input Nama Toko
            </div>
          </div>
          <div class="form-group formInput">
            <label>Upload Nota * : </label>
            <input type="file" name="imgInp" class="form-control" id="imgInp">
          </div>
          <img id="nota" src="#" alt="your image" style="display: none;" />
          
          <div class="form-group formInput py-3">
            <label>By doing this, you have to agree to our terms and condition : </label>
            <button class="btn btn-warning" id="btn-show-eula" disabled>EULA</button>
            <div class="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>

          <!-- EULA Section -->
          <div class="row" id="container-eula" style="display: none;">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Syarat - Syarat Kartu Garansi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td class='text-left'>Jasa Service Gratis Seumur Hidup (Tidak ada biaya Jasa Service).</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td class='text-left'>Masa berlaku garansi produk selama 1 tahun setelah tanggal pembelian, garansi berlaku untuk part terkait fungsi.</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td class='text-left'>Masa berlaku garansi Motor Kipas selama 5 tahun dari tanggal pembelian kecuali 18 TIF selama 3 tahun tanggal pembelian.</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td class='text-left'>Masa berlaku garansi Kompresor Dispenser selama 3 tahun dari tanggal pembelian.</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td class='text-left'>Masa berlaku garansi motor Pompa Air selama 3 tahun dari tanggal pembelian.</td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td class='text-left'>Masa berlaku garansi barang Grade dan barang Discontinue selama 6 bulan dari tanggal pembelian.</td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td class='text-left'>Berlaku garansi 1 bulan untuk jenis kerusakan sama,terhitung mulai pengembalian barang yang telah selesai di service.</td>
                </tr>
                <tr>
                  <th scope="row">8</th>
                  <td class='text-left'>Garansi hanya berlaku dan sah apabila kartu garansi ini telah terdaftar melalui link www. Cosmos.id/kartugaransi3</td>
                </tr>
                <tr>
                  <th scope="row">9</th>
                  <td class='text-left'>Garansi hanya berlaku jika dapat menunjukkan No. Seri Produk.</td>
                </tr>
                <tr>
                  <th scope="row">10</th>
                  <td class='text-left'>Perbaikan dilakukan di Pusat Layanan Service COSMOS terdekat atau hubungi Hotline Konsumen Cosmos.</td>
                </tr>
                <tr>
                  <th scope="row">11</th>
                  <td class='text-left'>Garansi tidak berlaku untuk Part yang mudah rusak/aus karena pemakaian.</td>
                </tr>
                <tr>
                  <th scope="row">12</th>
                  <td class='text-left'>Garansi tidak berlaku untuk Part Accesories (Contoh : Spoon, Steamer, Mesuring Cup, Stirer, Food Fork, Tray dll).</td>
                </tr>
              </tbody>
            </table>

            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Jaminan batal atau Tidak Berlaku Apabila :</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td class='text-left'>Kartu Garansi tidak divalidasi melalui website.</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td class='text-left'>Nomor seri tidak sesuai atau tidak dapat menunjukkan no. seri karena rusak atau lepas dari produk.</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td class='text-left'>Terjadi kerusakan yang di sebabkan oleh salah pemakaian, salah voltase listrik, perubahan untuk mengikuti permintaan/ selera pemakai, factor diluar kemampuan, kerusakan yang diakibatkan bencana alam (force majeur).</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td class='text-left'>Telah dilakukan perbaikan oleh pemakai sendiri atau pihak lain, diluar jaringan Layanan Service COSMOS yang resmi / ditunjuk.</td>
                </tr>
              </tbody>
            </table>

            <div class="form-group formInput">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="checkEula" required>
                <label class="form-check-label" for="invalidCheck">
                  Agree to terms and conditions
                </label>
                <div class="invalid-feedback">
                  You must agree before submitting.
                </div>
              </div>
            </div>
          </div>

          <button type="submit" name="register" class="btn btn-primary btn-block" id="registerTrue" style="display: none"></button>
          <button type="button" class="btn btn-primary btn-block formInput" id="register" disabled><i class="far fa-paper-plane"></i> Register SN</button>
        </form>
      </div>
    </div>

  </div>



  <script>
    jQuery(document).ready(function($) {
      const disableEula = () => {
        // Disable EULA
        $('#btn-show-eula').attr('disabled',true)
        $('#container-eula').hide()
        $('#checkEula').prop('checked',false)
        onChangeEula()
      }
      
      const onChangePostal = () => {
        $('#invalid-kodepos').hide()
        var kode = $('#kode_pos').val()

        if(kode.length > 5){
          kode = kode.slice(0,5)
          $('#kode_pos').val(kode)
          console.log(kode)
        }

        if(kode.length == 5){
          // AJAX
          var param = new Object()
          param["d"] = [{
            "postal" : kode
          }]
          param["i"] = "1752FF8C-327D-11EB-B811-0206859B6046"

          jQuery.ajax({
            url: 'https://api.cosmos.id/api/QA/Index',
            type: "POST",
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(param),
            success: function(response) {
              console.log(response)
              if(response[0].return_type == "Error"){
                $('#invalid-kodepos').show()
                disableEula()
              }else{
                var prov = $("#provinsi option:selected").text();
                var kota = $("#wilayah option:selected").text();
                if(response[0].provinsi == prov && response[0].kota == kota){
                  $('#btn-show-eula').attr('disabled',false)
                }else{
                  $('#invalid-kodepos').show()
                  disableEula()
                }
              }
            }
          });
        }else{
          disableEula()
        }
      }

      const onChangeEula = () => {
        console.log($('#checkEula').prop('checked'))
        if ($('#checkEula').prop('checked')) {
          $('#register').attr('disabled', false);
        } else {
          $('#register').attr('disabled', true);
        }
      }

      $('#container-eula').hide()

      $('#imgInp').on('change',function(){
         if (this.files && this.files[0]) {
          var reader = new FileReader();
          $('#nota').show()
          reader.onload = function (e) {
            $("#nota").attr("src", e.target.result);
          };
          reader.readAsDataURL(this.files[0]);
        }
      })

      $('#btn-pos-helper').click(function(e) {
        e.preventDefault()
        $('#modalKodePos').appendTo("body").modal('show');
      });

      $('#btn-show-eula').click((e) => {
        e.preventDefault()
        $('#container-eula').show()
      })

      $('#checkEula').on('click change',function() {
        onChangeEula()
      });

      $('#btn-post-submit').click((e) => {
        e.preventDefault()
        const postal = $("#kode_pos_select option:selected").text();
        $('#kode_pos').val(postal)
        $('#modalKodePos').modal('hide');
        onChangePostal()
      })

      $('#kode_pos').on('change keyup',(e) => {
        e.preventDefault()
        onChangePostal()
      })



      $('.js-select2').select2();


      var currentDate = new Date();

      $('#tanggal_pembelian').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        endDate: "currentDate",
        maxDate: currentDate,
      }).datepicker('setDate', currentDate).on('changeDate', function(ev) {
        $(this).datepicker('hide');
      });
      $('#tanggal_pembelian').keyup(function() {
        if (this.value.match(/[^0-9]/g)) {
          this.value = this.value.replace(/[^0-9^-]/g, '');
        }
      });


      $('#formid').on('keyup keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          e.preventDefault();
          return false;
        }
      });



      // CEK SN
      $("#cek_SN").on("click", function() {
        Swal.showLoading()

        try {
          $(".formInput").hide();
          var sn = $("#no_seri").val();
          if (sn.length === 9 || sn.length === 17) {
            var dataPost = {
              "d": [{
                "sn": `${sn}`,
              }],
              "i": "90D1641F-4E6E-11EB-9178-0AF22625E0F4"
            };
            var dataPost1 = {
              "d": [{
                "sn_input": `${sn}`,
              }],
              "i": "62259C9D-FE4F-11EA-B0EF-0A7D02AB83C4"
            };
            jQuery.ajax({
              url: 'https://api.cosmos.id/api/QA/Index',
              type: "POST",
              dataType: "json",
              contentType: 'application/json',
              data: JSON.stringify(dataPost),
              success: function(response) {
                if (response[0].return_type == "Error") {
                  Swal.fire({
                    title: response[0].return_message,
                    icon: "error"
                  });
                } else {
                  var img_test = response[0].material_desc.toLowerCase().substring(0, 5);
                  var myArr = [];
                  var x = $(`#test_img li:contains(${img_test})`).text();
                  var y = x.split(/(jpg|png)/g);
                  var myImage = $(`#test_img li:contains(${img_test})`).first().attr('id');
                  var id_toko = response[0].id_toko_retail
                  var nama_toko = response[0].nama_toko_retail

                  var z = '<div class="container">'
                  z += '<di class="row">'
                  z += '<div class="col-lg-12">'
                  z += '<div id="carouselExampleControls" class="carousel slide" data-ride="carousel" width="100%">';
                  z += '<div class="carousel-inner">';

                  $.each(y, function(index, value) {
                    if (value != '' && value != 'jpg' && value != "png") {
                      z += '<div class="carousel-item ' + (index == 0 ? 'active' : '') + '">';
                      z += '<img src="https://images.cosmos.id' + $(`#test_img li:contains(${value})`).attr('id') + '" class="w-50" >';
                      z += '</div>';
                    }
                  });
                  z += '</div>';
                  z += '<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">';
                  z += '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
                  z += '<span class="sr-only">Previous</span>';
                  z += '</a>';
                  z += '<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">';
                  z += '<span class="carousel-control-next-icon" aria-hidden="true"></span>';
                  z += '<span class="sr-only">Next</span>';
                  z += '</a>';
                  z += '</div>';
                  z += '</div>'
                  z += '</di>'
                  z += '</div>'


                  Swal.fire({
                    title: `${response[0].mvgr2_desc} - ${response[0].material_desc}`,
                    html: z,
                    showDenyButton: true,
                    customClass: 'swal-wide',
                    imageWidth: 400,
                    imageHeight: 200,
                    confirmButtonText: `Confirm`,
                    denyButtonText: `Edit`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      $(".formInput").show();
                      $('#model').attr('disabled', true);
                      $('#produk').attr('disabled', true)
                    } else if (result.isDenied) {
                      $(".formInput").show();
                      $('#model').attr('disabled', false);
                      $('#produk').attr('disabled', false)
                    }
                  })

                  // Default Value
                  $("#produk").val(response[0].mvgr2_id);
                  $('#nama_toko').val(nama_toko)
                  $('#id_toko').val(id_toko)

                  var fp_id = response[0].mvgr2_id;
                  var dataPost2 = {
                    "d": [{
                      "fp_id": `${fp_id}`,
                    }],
                    "i": "16588E43-33E7-11EB-9D97-0AB723CF68D0"
                  }

                  jQuery.ajax({
                    url: 'https://api.cosmos.id/api/PRO/Index',
                    type: "POST",
                    dataType: "json",
                    contentType: 'application/json',
                    data: JSON.stringify(dataPost2),
                    success: function(response2) {
                      $('#model').empty();
                      $('#model').append('<option value="">-- Pilih Model --</option>');
                      $.each(response2, function(index, value) {
                        $('#model ').append('<option value="' + value.MATNR + '">' + value.MAKTX + '</option>');
                      })
                      $('#model').val(response[0].material_id)
                    }
                  });
                }
              },
              error: function (xhr, ajaxOptions, thrownError) {
                Swal.fire({
                  title: "Gagal Cek SN",
                  icon: "info",
                });
              }
            });
          } else {
            Swal.fire({
              title: "Serial Number Hanya 9 atau 17 Character",
              icon: "error"
            });

          }
        } catch (error) {
          console.log(error)
        }
      })



      $("#produk").on("change", function() {
        var dataPost = {
          "d": [{
            "fp_id": `${this.value}`,
          }],
          "i": "16588E43-33E7-11EB-9D97-0AB723CF68D0"
        }

        jQuery.ajax({
          url: 'https://api.cosmos.id/api/PRO/Index',
          type: "POST",
          dataType: "json",
          contentType: 'application/json',
          data: JSON.stringify(dataPost),
          success: function(response) {
            $('#model').empty();
            $('#model').append('<option value="">-- Pilih Model --</option>');
            $.each(response, function(key, value) {
              $('#model').append('<option value="' + value.MATNR + '">' + value.MAKTX + '</option>');
            });
          },
        });


      })


      $("#provinsi").on('change', function() {
        onChangePostal()
        var dataPost = {
          "d": [{
            "prov": `${this.value}`,
          }],
          "i": "364D1BAD-327D-11EB-B811-0206859B6046"
        }


        jQuery.ajax({
          url: 'https://api.cosmos.id/api/PRO/Index',
          type: "POST",
          dataType: "json",
          contentType: 'application/json',
          data: JSON.stringify(dataPost),
          success: function(response) {
            if (response[0].return_type == "Error") {
              $('#wilayah').empty();
              $('#wilayah').append('<option value="">No Data</option>');
              $('#kecamatan').empty();
              $('#kecamatan').append('<option value="">No Data</option>');
              $('#kelurahan').empty();
              $('#kelurahan').append('<option value="">No Data</option>');
              $('#kode_pos_select').empty();
              $('#kode_pos_select').append('<option value="">No Data</option>');
            } else {
              var getCity = [];
              $.each(response, function(index, value) {

                if (getCity.indexOf(value.kota) === -1) {
                  getCity.push(value.kota);
                }
              });
              $('#wilayah').empty();
              $('#wilayah').append('<option value="">-- Pilih Wilayah --</option>');
              $.each(getCity, function(index, value) {
                $('#wilayah ').append('<option value="' + value + '">' + value + '</option>');
              })

            }
          },
        });

      });

      $("#wilayah").on('change', function() {
        onChangePostal()
        var provId = $('#provinsi').val();
        var wilayahId = $('#wilayah').val();

        var dataPost = {
          "d": [{
            "provinsi": `${provId}`,
            "kota": `${wilayahId}`,
          }],
          "i": "696D5AFF-4DC6-11EB-9178-0AF22625E0F4"
        }

        jQuery.ajax({
          url: 'https://api.cosmos.id/api/PRO/Index',
          type: "POST",
          dataType: "json",
          contentType: 'application/json',
          data: JSON.stringify(dataPost),
          success: function(response) {
            if (response[0].return_type == "Error") {
              $('#kecamatan').empty();
              $('#kecamatan').append('<option value="">No Data</option>');
              $('#kelurahan').empty();
              $('#kelurahan').append('<option value="">No Data</option>');
              $('#kode_pos_select').empty();
              $('#kode_pos_select').append('<option value="">No Data</option>');

            } else {
              $('#kecamatan').empty();
              $('#kecamatan').append('<option value="">-- Pilih Kecamatan --</option>');
              $.each(response, function(index, value) {
                $('#kecamatan ').append('<option value="' + value.kecamatan + '">' + value.kecamatan + '</option>');
              })
            }
          },
        });

      });

      $("#kecamatan").on('change', function() {
        var provId = $('#provinsi').val();
        var wilayahId = $('#wilayah').val();
        var kecamatanId = $('#kecamatan').val();

        var dataPost = {
          "d": [{
            "provinsi": `${provId}`,
            "kota": `${wilayahId}`,
            "kecamatan": `${kecamatanId}`,
          }],
          "i": "70415869-4DC6-11EB-9178-0AF22625E0F4"
        }


        jQuery.ajax({
          url: 'https://api.cosmos.id/api/PRO/Index',
          type: "POST",
          dataType: "json",
          contentType: 'application/json',
          data: JSON.stringify(dataPost),
          success: function(response) {

            if (response[0].return_type == "Error") {
              $('#kelurahan').empty();
              $('#kelurahan').append('<option value="">No Data</option>');
              $('#kode_pos_select').empty();
              $('#kode_pos_select').append('<option value="">No Data</option>');

            } else {

              $('#kelurahan').empty();
              $('#kelurahan').append('<option value="">-- Pilih Kelurahan --</option>');
              $.each(response, function(index, value) {
                $('#kelurahan ').append('<option value="' + value.kelurahan + '">' + value.kelurahan + '</option>');
              })
            }
          },
        });

      });

      $("#kelurahan").on('change', function() {
        var provId = $('#provinsi').val();
        var wilayahId = $('#wilayah').val();
        var kecamatanId = $('#kecamatan').val();
        var kelurahanId = $('#kelurahan').val();

        var dataPost = {
          "d": [{
            "provinsi": `${provId}`,
            "kota": `${wilayahId}`,
            "kecamatan": `${kecamatanId}`,
            "kelurahan": `${kelurahanId}`,
          }],
          "i": "77287A9B-4DC6-11EB-9178-0AF22625E0F4"
        }

        jQuery.ajax({
          url: 'https://api.cosmos.id/api/PRO/Index',
          type: "POST",
          dataType: "json",
          contentType: 'application/json',
          data: JSON.stringify(dataPost),
          success: function(response) {

            if (response[0].return_type == "Error") {
              $('#kode_pos_select').empty();
              $('#kode_pos_select').append('<option value="">No Data</option>');

            } else {
              $('#kode_pos_select').empty();
              $('#kode_pos_select').append('<option value="">-- Pilih Kode Pos --</option>');
              $.each(response, function(index, value) {
                $('#kode_pos_select ').append('<option value="' + value.kode_pos + '">' + value.kode_pos + '</option>');
              })
            }

          },
        });

      });

      $('#register').on('click', function() {
        var no_seri = $('#no_seri').val();
        var produk = $('#produk').val();
        var model = $('#model').val();
        var nama_lengkap = $('#nama_lengkap').val();
        var no_telepon = $('#no_telepon').val();
        var provinsi = $('#provinsi').val();
        var wilayah = $('#wilayah').val();
        var kecamatan = $('#kecamatan').val();
        var kelurahan = $('#kelurahan').val();
        var kode_pos = $('#kode_pos').val();
        var alamat = $('#alamat').val();
        var email = $('#email').val();
        var tanggal_pembelian = $('#tanggal_pembelian').val();
        var nama_toko = $('#nama_toko').val();
        var id_toko = $('#id_toko').val();
        var newBuy = tanggal_pembelian.split("/").reverse().join("-");
        var imgInp = $('#imgInp').val();




        if (no_seri == "") {
          $('#no_seri').addClass('is-invalid')
          $('#no_seri').first().focus();
        } else if (no_seri.length != 9 && no_seri.length != 17) {
          $('#no_seri').addClass('is-invalid')
          $('#no_seri').first().focus()
          $('.sn-invalid').text('No Seri Wajib 9 atau 17 Character')
        } else {
          $('#no_seri').removeClass('is-invalid')
        }
        if (produk == "") {
          $('#produk').addClass('is-invalid')
          $('#produk').first().focus();
        } else {
          $('#produk').removeClass('is-invalid')
        }
        if (model == "") {
          $('#model').addClass('is-invalid')
          $('#model').first().focus();
        } else {
          $('#model').removeClass('is-invalid')
        }
        if (nama_lengkap == "") {
          $('#nama_lengkap').addClass('is-invalid')
          $('#nama_lengkap').first().focus();
        } else {
          $('#nama_lengkap').removeClass('is-invalid')
        }
        if (no_telepon == "") {
          $('#no_telepon').addClass('is-invalid')
          $('#no_telepon').first().focus();
        } else {
          $('#no_telepon').removeClass('is-invalid')
        }
        if (provinsi == "") {
          $('#provinsi').addClass('is-invalid')
          $('#provinsi').first().focus();
        } else {
          $('#provinsi').removeClass('is-invalid')
        }
        if (wilayah == "") {
          $('#wilayah').addClass('is-invalid')
          $('#wilayah').first().focus();
        } else {
          $('#wilayah').removeClass('is-invalid')
        }
        if (kode_pos == "") {
          $('#kode_pos').addClass('is-invalid')
          $('#kode_pos').first().focus();
        } else {
          $('#kode_pos').removeClass('is-invalid')
        }
        if (alamat == "") {
          $('#alamat').addClass('is-invalid')
          $('#alamat').first().focus();
        } else {
          $('#alamat').removeClass('is-invalid')
        }
        if (email == "") {
          $('#email').addClass('is-invalid')
          $('#email').first().focus();
        } else {
          $('#email').removeClass('is-invalid')
        }
        if (tanggal_pembelian == "") {
          $('#tanggal_pembelian').addClass('is-invalid')
          $('#tanggal_pembelian').first().focus();
        } else {
          $('#tanggal_pembelian').removeClass('is-invalid')
        }
        if (nama_toko == "") {
          $('#nama_toko').addClass('is-invalid')
          $('#nama_toko').first().focus();
        } else {
          $('#nama_toko').removeClass('is-invalid')
        }




        if (no_seri !== "" && produk !== "" && model !== "" && nama_lengkap !== "" && no_telepon !== "" && provinsi !== "" && wilayah !== "" && kode_pos !== "" && alamat !== "" && email !== "" && tanggal_pembelian !== "" && nama_toko !== "" && no_seri.length === 9 || no_seri.length === 17) {


          a()
     

          function a () {
            if(imgInp !== ""){
              $("#nota").watermark({
                text: `${nama_lengkap} - ${no_telepon}`,
                textWidth: 500,
                gravity: "h",
                opacity: 1,
                margin: 1,
              });
            }
          }
          
          var base = ""

          if(imgInp !== ""){
            var photo_inv = $('#nota').attr('src');
            var myArr = photo_inv.split(",");
            //var base = photo_inv.substring(23);
            base = myArr[1];
          }
          console.log(base);

          Swal.fire({
            title: "Apakah Anda Ingin Mendaftarkan SN Ini ?",
            icon: "info",
            showDenyButton: true,
            confirmButtonText: `Confirm`,
            denyButtonText: `Cancel`,
          }).then((result) => {
            if (result.isConfirmed) {
              var dataPost = {
                "d": [{
                  "action": "regist",
                  "sn": `${no_seri}`,
                  // "matdesc": `${$('#model option:selected').text()}`,
                  // "famprod": `${$('#produk option:selected').text()}`,
                  // "matid": `${$('#model option:selected').val()}`,
                  // "famid": `${$('#produk option:selected').val()}`,
                  "custname": `${nama_lengkap}`,
                  "phone": `${no_telepon}`,
                  "address": `${alamat}`,
                  "prov": `${provinsi}`,
                  "city": `${wilayah}`,
                  "postal": `${kode_pos}`,
                  "buydate": `${newBuy}`,
                  "storeid": `${id_toko}`,
                  "storename": `${nama_toko}`,
                  "custemail": `${email}`,
                  "user": "web",
                  "origin": "W",
                  // "register_by": "web",
                  "photo_invoice": `${base}`
                }],
                "i": "CA0E8483-C540-11EC-95E1-067C8FBEA972"
              }

              Swal.fire({
                  title: 'Please Wait',
                  text: 'Registering Serial Number...',
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  allowEnterKey: false,
                  showConfirmButton: false,
                  onOpen: () => {
                      Swal.showLoading()
                  }
              })
             
              jQuery.ajax({
                url: 'https://api.cosmos.id/api/QA/Index',
                type: "POST",
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify(dataPost),
                success: function(response) {
                  if (response[0].return_type == "Success") {
                    Swal.hideLoading()
                    Swal.fire({
                      title: `${response[0].return_message}`,
                      icon: "success"
                    }).then(function() {
                      location.reload();
                    });


                  } else {
                    Swal.hideLoading()
                    Swal.fire({
                      title: `${response[0].return_message}`,
                      icon: "error"
                    }).then(function() {
                      location.reload();
                    });
                  }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                  Swal.hideLoading()
                  Swal.fire({
                    title: "Gagal Submit SN",
                    icon: "info",
                  });
                }
              });
            } else if (result.isDenied) {
              Swal.hideLoading()
              Swal.fire({
                title: "Gagal Submit SN",
                icon: "info",
              });
            }
          });

        } else {
          Swal.fire({
            title: "Silahkan Cek Kembali Form Inputan Anda",
            icon: "error",
            confirmButtonText: `Confirm`,
          })
        }
      })
    });
  </script>

<?php

}



add_shortcode('form_kartu_garansi3', 'form3');
