<template>
  <q-card class="shadow-0 song-list">
      <q-card-section>
        <div class="row">
          <div class="col-xs-2 col-sm-1">
            <q-img
              id="cover-image"
              src="https://e-cdns-images.dzcdn.net/images/cover/a5cb60a182d5df68d5721df9fa75c02b/500x500-000000-80-0-0.jpg"
              class="vertical-middle shadow-0"
            ></q-img>
          </div>
          <div class="col-xs-9 col-sm-10 margin-auto">
            <div class="column song-list">
              <div class="song-list-name">
                Sing to me
              </div>
              <div class="song-list-author">
                MISSIO
              </div>
            </div>
          </div>
          <div class="col-xs-1 col-sm-1 margin-auto">
            <q-btn
              round
              flat
              color="black"
              icon="favorite_border"
              class="favorite float-r"
              unelevated
            >
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
</template>

<script>
export default {
  name: 'SongItem'
}
</script>

<style lang="sass">
@import ../css/components/mixin

h1
  font-family: 'Mandatory'

.song-list
  #cover-image
    width: 60%
    border-radius: 6px
  .q-card__section
    padding: 5px 15px
  .song-list
    font-family: 'aBeeZee'
    font-style: italic
    font-weight: bold
  .song-list-name
    color: $song-name
    font-size: 14px
  .song-list-author
    color: $song-author
    font-size: 12px
  .margin-auto
    margin: auto
  .float-r
    float: right
  @include for-size(phone)
    #cover-image
      width: 80%
      margin: auto
    .favorite
      font-size: 10px
  @include for-size(tablet-portrait)
    .favorite
      font-size: 11px  
  @include for-size(tablet-landscape)
    .favorite
      font-size: 12.5px 
  @include for-size(desktop)
    .favorite
      font-size: 13px 
</style>
